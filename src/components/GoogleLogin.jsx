import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const GoogleLogin = ({ buttonText = "Continue with Google", className = "", mode = "login" }) => {
  const { googleAuth } = useAuth();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUserInfo, setGoogleUserInfo] = useState(null);
  const [selectedRole, setSelectedRole] = useState('user');

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        const userInfo = await userInfoResponse.json();
        
        // For registration, show role selection modal
        if (mode === 'register') {
          setGoogleUserInfo(userInfo);
          setShowRoleModal(true);
        } else {
          // For login, proceed without role selection
          await completeGoogleAuth(userInfo, 'user');
        }
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
    },
  });

  const completeGoogleAuth = async (userInfo, role) => {
    try {
      const result = await googleAuth({
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.sub,
        picture: userInfo.picture,
        role: role // Pass the selected role
      });

      if (result.success) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Google auth completion error:', error);
    }
  };

  const handleRoleSelect = async () => {
    await completeGoogleAuth(googleUserInfo, selectedRole);
    setShowRoleModal(false);
  };

  return (
    <>
      <button 
        onClick={() => login()} 
        className={`social-btn google ${className}`}
        type="button"
      >
        <FaGoogle /> {buttonText}
      </button>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="role-modal-overlay">
          <div className="role-modal">
            <h3>Choose Your Role</h3>
            <p>How will you be using Strokify?</p>
            
            <div className="role-options">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={selectedRole === 'user'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <div className="role-content">
                  <h4>Patient / Family Member</h4>
                  <p>Monitor your health and track symptoms</p>
                </div>
              </label>
              
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="caregiver"
                  checked={selectedRole === 'caregiver'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <div className="role-content">
                  <h4>Caregiver / Medical Professional</h4>
                  <p>Monitor multiple patients and provide care</p>
                </div>
              </label>
            </div>

            <div className="role-modal-actions">
              <button onClick={() => setShowRoleModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleRoleSelect} className="confirm-btn">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleLogin;