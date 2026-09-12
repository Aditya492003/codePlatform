import { mockLeaderboard } from '../data/mockLeaderboard';
import { mockUser } from '../data/mockUser';
import { apiRequest } from './api';

export const userService = {
  /**
   * Sync Clerk user to backend MongoDB Atlas
   */
  async syncUser(userData) {
    try {
      const res = await apiRequest('/users/sync', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return res.data;
    } catch (err) {
      console.warn('Sync user failed, continuing with client state:', err.message);
      return null;
    }
  },

  /**
   * Get user profile from Atlas
   */
  async getUserProfile(userId) {
    try {
      const res = await apiRequest(`/users/profile/${userId}`);
      if (res?.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('Get user profile failed, using fallback mock user:', err.message);
    }
    return mockUser;
  },

  /**
   * Get Global Leaderboard from Atlas
   */
  async getLeaderboard(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await apiRequest(`/users/leaderboard?${query}`);
      if (res?.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('Get leaderboard failed, using fallback mock leaderboard:', err.message);
    }
    return mockLeaderboard;
  },
};
