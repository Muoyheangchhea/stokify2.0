import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, FaBrain, FaUsers, FaCalendar, 
  FaChartLine, FaArrowRight, FaUser, FaBell,
  FaExclamationTriangle, FaAmbulance
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { symptomAPI, lifeSyncAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentAssessment, setRecentAssessment] = useState(null);
  const [familyAlerts, setFamilyAlerts] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [assessmentsRes, alertsRes, appointmentsRes] = await Promise.all([
        symptomAPI.getHistory(),
        lifeSyncAPI.getAlerts(),
        lifeSyncAPI.getAppointments()
      ]);

      if (assessmentsRes.data.data.length > 0) {
        setRecentAssessment(assessmentsRes.data.data[0]);
      }
      setFamilyAlerts(alertsRes.data.data || []);
      setUpcomingAppointments(appointmentsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's your health overview</p>
        </div>
        <div className="risk-badge" style={{ backgroundColor: getRiskColor(user?.riskLevel) + '15' }}>
          <span className="risk-dot" style={{ backgroundColor: getRiskColor(user?.riskLevel) }}></span>
          <span>Risk Level: {user?.riskLevel || 'Not assessed'}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/symptom-detector" className="quick-action-card">
          <FaBrain className="action-icon" />
          <span>New Assessment</span>
          <FaArrowRight className="action-arrow" />
        </Link>
        <Link to="/caregivers" className="quick-action-card">
          <FaHeartbeat className="action-icon" />
          <span>Find Caregiver</span>
          <FaArrowRight className="action-arrow" />
        </Link>
        <Link to="/family/add" className="quick-action-card">
          <FaUsers className="action-icon" />
          <span>Add Family Member</span>
          <FaArrowRight className="action-arrow" />
        </Link>
        <Link to="/appointments" className="quick-action-card">
          <FaCalendar className="action-icon" />
          <span>Schedule</span>
          <FaArrowRight className="action-arrow" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#E63E4E15', color: '#E63E4E' }}>
            <FaBrain />
          </div>
          <div className="stat-info">
            <span className="stat-label">Last Assessment</span>
            <span className="stat-value">
              {recentAssessment ? new Date(recentAssessment.createdAt).toLocaleDateString() : 'Never'}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10B98115', color: '#10B981' }}>
            <FaUsers />
          </div>
          <div className="stat-info">
            <span className="stat-label">Family Members</span>
            <span className="stat-value">{user?.familyMembers?.length || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#F59E0B15', color: '#F59E0B' }}>
            <FaBell />
          </div>
          <div className="stat-info">
            <span className="stat-label">Alerts</span>
            <span className="stat-value">{familyAlerts.length}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#8B5CF615', color: '#8B5CF6' }}>
            <FaChartLine />
          </div>
          <div className="stat-info">
            <span className="stat-label">Health Score</span>
            <span className="stat-value">{user?.healthScore || '--'}</span>
          </div>
        </div>
      </div>

      {/* Recent Assessment */}
      {recentAssessment && (
        <div className="recent-assessment">
          <div className="section-header">
            <h2>Last Assessment</h2>
            <Link to="/assessments" className="view-all">View All →</Link>
          </div>
          
          <div className="assessment-card">
            <div className="assessment-date">
              {new Date(recentAssessment.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            <div className="assessment-risk">
              <div className="risk-meter">
                <div className="risk-label">
                  <span>Stroke Risk</span>
                  <span className="risk-value" style={{ color: getRiskColor(recentAssessment.analysis.riskLevel) }}>
                    {recentAssessment.analysis.riskLevel}
                  </span>
                </div>
                <div className="risk-bar">
                  <div 
                    className="risk-progress" 
                    style={{ 
                      width: `${recentAssessment.analysis.score || 0}%`,
                      backgroundColor: getRiskColor(recentAssessment.analysis.riskLevel)
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="assessment-factors">
              {recentAssessment.analysis.factors?.slice(0, 3).map((factor, index) => (
                <span key={index} className="factor-tag">{factor}</span>
              ))}
            </div>

            <Link to={`/assessments/${recentAssessment._id}`} className="view-details">
              View Details <FaArrowRight />
            </Link>
          </div>
        </div>
      )}

      {/* Family Alerts */}
      {familyAlerts.length > 0 && (
        <div className="family-alerts">
          <div className="section-header">
            <h2>Family Alerts</h2>
            <Link to="/family" className="view-all">View All →</Link>
          </div>

          <div className="alerts-list">
            {familyAlerts.slice(0, 3).map(alert => (
              <div key={alert._id} className={`alert-item severity-${alert.severity}`}>
                <FaExclamationTriangle className="alert-icon" />
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency FAST Reminder */}
      <div className="fast-reminder">
        <FaAmbulance className="fast-icon" />
        <div className="fast-content">
          <h3>Remember FAST</h3>
          <p>Face · Arms · Speech · Time</p>
        </div>
        <Link to="/symptom-detector" className="fast-button">
          Check Symptoms
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;