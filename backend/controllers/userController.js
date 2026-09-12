import User from '../models/User.js';

/**
 * Sync or create user from Clerk authentication
 * POST /api/users/sync
 */
export const syncClerkUser = async (req, res) => {
  try {
    const { clerkId, email, fullName, avatarUrl, username } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ success: false, message: 'clerkId and email are required' });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        fullName: fullName || '',
        avatarUrl: avatarUrl || '',
        username: username || email.split('@')[0],
        ratingHistory: [
          {
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            rating: 750,
          },
        ],
      });
    } else {
      // Update avatar or name if changed
      let hasChange = false;
      if (fullName && user.fullName !== fullName) {
        user.fullName = fullName;
        hasChange = true;
      }
      if (avatarUrl && user.avatarUrl !== avatarUrl) {
        user.avatarUrl = avatarUrl;
        hasChange = true;
      }
      if (hasChange) {
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ success: false, message: 'Failed to sync user', error: error.message });
  }
};

/**
 * Get user profile by Clerk ID or Mongo ID
 * GET /api/users/profile/:id
 */
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await User.findOne({ clerkId: id });
    if (!user && id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
};

/**
 * Update user profile details (bio, title, links)
 * PUT /api/users/profile/:id
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, title, bio, country, socialLinks } = req.body;

    const user = await User.findOneAndUpdate(
      { $or: [{ clerkId: id }, ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])] },
      {
        $set: {
          ...(fullName !== undefined && { fullName }),
          ...(title !== undefined && { title }),
          ...(bio !== undefined && { bio }),
          ...(country !== undefined && { country }),
          ...(socialLinks !== undefined && { socialLinks }),
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
};

/**
 * Get Global Leaderboard
 * GET /api/users/leaderboard?limit=50
 */
export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 50, skip = 0, technology } = req.query;

    const query = {
      clerkId: { $ne: 'usr_guest', $not: /^mock_/ },
    };
    const sortField = technology ? `skillRatings.${technology}` : 'overallRating';

    const users = await User.find(query)
      .sort({ [sortField]: -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .select('username fullName avatarUrl overallRating tier problemsSolved accuracy country streak skillRatings');

    // Add rank numbering
    const leaderboard = users.map((u, index) => ({
      rank: Number(skip) + index + 1,
      id: u._id,
      clerkId: u.clerkId,
      name: u.fullName || u.username,
      username: u.username,
      avatarUrl: u.avatarUrl,
      rating: u.overallRating,
      tier: u.tier,
      solved: u.problemsSolved,
      accuracy: u.accuracy,
      country: u.country || 'Global',
      streak: u.streak || 0,
      skillRatings: u.skillRatings,
    }));

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leaderboard', error: error.message });
  }
};
