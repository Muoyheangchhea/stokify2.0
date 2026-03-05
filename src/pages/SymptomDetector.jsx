import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaHeart, FaLungs, FaWineBottle, FaApple, 
  FaBed, FaArrowRight, FaArrowLeft, FaCheck, FaClock,
  FaBrain, FaHeartbeat, FaTint, FaLungsVirus, FaSmoking,
  FaWeight, FaRuler, FaUsers, FaMapMarkerAlt, FaInfoCircle,
  FaExclamationTriangle, FaShieldAlt, FaLeaf, FaChartLine,
  FaFileAlt, FaDownload, FaPrint, FaShare, FaTimes
} from 'react-icons/fa';
import '../styles/SymptomDetector.css';

const SymptomDetector = () => {
  // ---------- Current Step State ----------
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportData, setReportData] = useState(null);

  // ---------- Form Data State ----------
  const [formData, setFormData] = useState({
    // Section 1: Demographics
    age: 35,
    sex: '',
    ethnicity: '',
    maritalStatus: '',
    height: 170,
    weight: 70,
    residenceType: '',
    
    // Section 2: Medical History
    familyStroke: '',
    familyHeart: '',
    familyDiabetes: '',
    hasHighBP: '',
    bpMedication: '',
    hasHeartDisease: '',
    hasDiabetes: '',
    diabetesMedication: '',
    knowsBP: 'unknown',
    systolic: '',
    diastolic: '',
    knowsGlucose: 'unknown',
    glucose: '',
    
    // Section 3: Lifestyle
    smokingStatus: '',
    cigarettesPerDay: '',
    alcoholConsumption: '',
    diet: '',
    physicalActivity: '',
    sleepStress: ''
  });

  // ---------- Fix any corrupted age values on mount ----------
  useEffect(() => {
    if (formData.age < 20 || formData.age > 100 || isNaN(formData.age)) {
      setFormData(prev => ({ ...prev, age: 35 }));
    }
  }, []);

  // ---------- UI State for Conditional Fields ----------
  const [showBpMedication, setShowBpMedication] = useState(false);
  const [showDiabetesMedication, setShowDiabetesMedication] = useState(false);
  const [showCigarettes, setShowCigarettes] = useState(false);
  const [showBpInputs, setShowBpInputs] = useState(false);
  const [showGlucoseInput, setShowGlucoseInput] = useState(false);

  // ---------- Question Configuration ----------
  const sections = [
    {
      id: 1,
      title: 'Personal Profile',
      subtitle: 'Tell us about yourself',
      icon: <FaUser />,
      color: '#E63E4E',
      questions: [
        {
          id: 'age',
          type: 'slider',
          label: 'What is your age?',
          icon: <FaUser />,
          min: 20,
          max: 100,
          unit: 'years'
        },
        {
          id: 'sex',
          type: 'options',
          label: 'What is your gender?',
          icon: <FaUser />,
          options: ['Male', 'Female', 'Prefer not to say']
        },
        {
          id: 'ethnicity',
          type: 'options',
          label: 'What is your ethnicity?',
          icon: <FaUsers />,
          options: ['Khmer', 'Vietnamese', 'Chinese', 'Other']
        },
        {
          id: 'maritalStatus',
          type: 'options',
          label: 'What is your marital status?',
          icon: <FaHeart />,
          options: ['Single', 'Married', 'Divorced', 'Widowed']
        },
        {
          id: 'heightWeight',
          type: 'dual-slider',
          label: 'What is your height and weight?',
          icon: <FaRuler />,
          heightMin: 140,
          heightMax: 220,
          weightMin: 40,
          weightMax: 150
        },
        {
          id: 'residenceType',
          type: 'options',
          label: 'Where do you live?',
          icon: <FaMapMarkerAlt />,
          options: ['Urban', 'Suburban', 'Rural']
        }
      ]
    },
    {
      id: 2,
      title: 'Medical History',
      subtitle: 'Your health background',
      icon: <FaHeartbeat />,
      color: '#10B981',
      questions: [
        {
          id: 'familyStroke',
          type: 'yes-no',
          label: 'Has anyone in your immediate family ever had a stroke?',
          icon: <FaBrain />
        },
        {
          id: 'familyHeart',
          type: 'yes-no',
          label: 'Has anyone in your immediate family ever had heart disease?',
          icon: <FaHeartbeat />
        },
        {
          id: 'familyDiabetes',
          type: 'yes-no',
          label: 'Has anyone in your immediate family ever been diagnosed with diabetes?',
          icon: <FaTint />
        },
        {
          id: 'hasHighBP',
          type: 'yes-no',
          label: 'Have you ever been diagnosed with high blood pressure?',
          icon: <FaHeartbeat />,
          conditional: true,
          conditionField: 'bpMedication',
          conditionLabel: 'Do you take medication for it regularly?'
        },
        {
          id: 'hasHeartDisease',
          type: 'yes-no',
          label: 'Have you ever been diagnosed with any heart condition?',
          icon: <FaHeart />
        },
        {
          id: 'hasDiabetes',
          type: 'yes-no',
          label: 'Have you ever been diagnosed with diabetes or high blood sugar?',
          icon: <FaTint />,
          conditional: true,
          conditionField: 'diabetesMedication',
          conditionLabel: 'Do you take medication for it (pills or insulin)?'
        },
        {
          id: 'knowsBP',
          type: 'bp-input',
          label: 'Recent Blood Pressure',
          icon: <FaHeartbeat />
        },
        {
          id: 'knowsGlucose',
          type: 'glucose-input',
          label: 'Recent Blood Glucose Level',
          icon: <FaTint />
        }
      ]
    },
    {
      id: 3,
      title: 'Lifestyle & Habits',
      subtitle: 'Your daily routines',
      icon: <FaLungs />,
      color: '#F59E0B',
      questions: [
        {
          id: 'smokingStatus',
          type: 'smoking',
          label: 'Smoking Habit',
          icon: <FaSmoking />,
          options: ['Never smoked', 'Former smoker', 'Current smoker']
        },
        {
          id: 'alcoholConsumption',
          type: 'options',
          label: 'Alcohol Consumption',
          icon: <FaWineBottle />,
          options: ['Never', 'Occasionally (social events)', 'Regularly (1–2 times/week)', 'Frequently (3+ times/week)']
        },
        {
          id: 'diet',
          type: 'options',
          label: 'Which best describes your usual diet?',
          icon: <FaApple />,
          options: [
            'Balanced (fruits, vegetables, lean protein)',
            'High in salty foods (prahok, processed foods)',
            'High in fatty foods (fried foods, fatty meats)',
            'High in sugary foods & drinks'
          ]
        },
        {
          id: 'physicalActivity',
          type: 'options',
          label: 'How often do you do moderate exercise?',
          icon: <FaHeartbeat />,
          options: [
            'Sedentary (little to no exercise)',
            'Light (1–2 times/week)',
            'Moderate (3–4 times/week)',
            'Active (5+ times/week)'
          ]
        },
        {
          id: 'sleepStress',
          type: 'options',
          label: 'How often do you feel well-rested and manage stress effectively?',
          icon: <FaBed />,
          options: ['Rarely', 'Sometimes', 'Often', 'Almost always']
        }
      ]
    }
  ];

  // ---------- Calculate BMI ----------
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = formData.height / 100;
      const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);
      return bmi;
    }
    return '—';
  };

  // ---------- Calculate Risk Score ----------
  const calculateRiskScore = () => {
    let score = 0;
    let maxScore = 0;
    let factors = [];

    // Age risk
    if (formData.age) {
      maxScore += 15;
      if (formData.age > 60) {
        score += 15;
        factors.push({ factor: 'Age > 60', impact: 'high', points: 15 });
      } else if (formData.age > 45) {
        score += 8;
        factors.push({ factor: 'Age 45-60', impact: 'moderate', points: 8 });
      } else {
        factors.push({ factor: 'Age < 45', impact: 'low', points: 0 });
      }
    }

    // Sex risk (men slightly higher)
    if (formData.sex) {
      maxScore += 5;
      if (formData.sex === 'Male') {
        score += 5;
        factors.push({ factor: 'Male gender', impact: 'moderate', points: 5 });
      }
    }

    // Family history
    if (formData.familyStroke === 'Yes') {
      maxScore += 15;
      score += 15;
      factors.push({ factor: 'Family history of stroke', impact: 'high', points: 15 });
    }
    if (formData.familyHeart === 'Yes') {
      maxScore += 10;
      score += 10;
      factors.push({ factor: 'Family history of heart disease', impact: 'moderate', points: 10 });
    }
    if (formData.familyDiabetes === 'Yes') {
      maxScore += 10;
      score += 10;
      factors.push({ factor: 'Family history of diabetes', impact: 'moderate', points: 10 });
    }

    // High blood pressure
    if (formData.hasHighBP === 'Yes') {
      maxScore += 20;
      score += 20;
      factors.push({ factor: 'Diagnosed hypertension', impact: 'high', points: 20 });
      
      if (formData.bpMedication === 'No') {
        maxScore += 10;
        score += 10;
        factors.push({ factor: 'Untreated hypertension', impact: 'high', points: 10 });
      }
    }

    // Blood pressure readings
    if (formData.systolic && formData.diastolic) {
      const sys = parseInt(formData.systolic);
      const dia = parseInt(formData.diastolic);
      
      if (sys >= 140 || dia >= 90) {
        maxScore += 15;
        score += 15;
        factors.push({ factor: 'Elevated blood pressure', impact: 'high', points: 15 });
      } else if (sys >= 130 || dia >= 80) {
        maxScore += 8;
        score += 8;
        factors.push({ factor: 'Borderline hypertension', impact: 'moderate', points: 8 });
      }
    }

    // Heart disease
    if (formData.hasHeartDisease === 'Yes') {
      maxScore += 15;
      score += 15;
      factors.push({ factor: 'Existing heart condition', impact: 'high', points: 15 });
    }

    // Diabetes
    if (formData.hasDiabetes === 'Yes') {
      maxScore += 20;
      score += 20;
      factors.push({ factor: 'Diabetes', impact: 'high', points: 20 });
      
      if (formData.diabetesMedication === 'No') {
        maxScore += 5;
        score += 5;
        factors.push({ factor: 'Unmanaged diabetes', impact: 'moderate', points: 5 });
      }
    }

    // Glucose levels
    if (formData.glucose) {
      const glucose = parseInt(formData.glucose);
      if (glucose > 125) {
        maxScore += 10;
        score += 10;
        factors.push({ factor: 'Elevated blood glucose', impact: 'high', points: 10 });
      } else if (glucose > 100) {
        maxScore += 5;
        score += 5;
        factors.push({ factor: 'Pre-diabetic range', impact: 'moderate', points: 5 });
      }
    }

    // Smoking
    if (formData.smokingStatus === 'Current smoker') {
      maxScore += 25;
      score += 25;
      factors.push({ factor: 'Current smoker', impact: 'high', points: 25 });
      
      if (formData.cigarettesPerDay > 20) {
        score += 5;
        factors.push({ factor: 'Heavy smoker', impact: 'high', points: 5 });
      }
    } else if (formData.smokingStatus === 'Former smoker') {
      maxScore += 10;
      score += 10;
      factors.push({ factor: 'Former smoker', impact: 'moderate', points: 10 });
    }

    // Alcohol
    if (formData.alcoholConsumption?.includes('Frequently')) {
      maxScore += 15;
      score += 15;
      factors.push({ factor: 'Heavy alcohol use', impact: 'high', points: 15 });
    } else if (formData.alcoholConsumption?.includes('Regularly')) {
      maxScore += 8;
      score += 8;
      factors.push({ factor: 'Regular alcohol use', impact: 'moderate', points: 8 });
    }

    // Diet
    if (formData.diet?.includes('salty') || formData.diet?.includes('fatty') || formData.diet?.includes('sugary')) {
      maxScore += 15;
      score += 15;
      factors.push({ factor: 'Poor dietary habits', impact: 'moderate', points: 15 });
    }

    // Physical activity
    if (formData.physicalActivity?.includes('Sedentary')) {
      maxScore += 15;
      score += 15;
      factors.push({ factor: 'Sedentary lifestyle', impact: 'moderate', points: 15 });
    } else if (formData.physicalActivity?.includes('Light')) {
      maxScore += 5;
      score += 5;
      factors.push({ factor: 'Low physical activity', impact: 'low', points: 5 });
    }

    // Sleep & stress
    if (formData.sleepStress === 'Rarely') {
      maxScore += 10;
      score += 10;
      factors.push({ factor: 'Poor sleep & high stress', impact: 'moderate', points: 10 });
    } else if (formData.sleepStress === 'Sometimes') {
      maxScore += 5;
      score += 5;
      factors.push({ factor: 'Occasional sleep/stress issues', impact: 'low', points: 5 });
    }

    // Calculate percentage
    const riskPercentage = Math.min(Math.round((score / (maxScore || 100)) * 100), 100);
    
    return {
      score: riskPercentage,
      factors: factors.sort((a, b) => b.points - a.points),
      rawScore: score,
      maxScore: maxScore || 100
    };
  };

  // ---------- Generate Full Report ----------
  const generateReport = () => {
    const risk = calculateRiskScore();
    const bmi = calculateBMI();
    const bmiNum = parseFloat(bmi);
    let bmiCategory = '';
    let bmiColor = '';
    
    if (bmiNum < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = '#F59E0B';
    } else if (bmiNum < 25) {
      bmiCategory = 'Healthy weight';
      bmiColor = '#10B981';
    } else if (bmiNum < 30) {
      bmiCategory = 'Overweight';
      bmiColor = '#F59E0B';
    } else {
      bmiCategory = 'Obese';
      bmiColor = '#EF4444';
    }

    let riskLevel = '';
    let riskColor = '';
    let riskDescription = '';

    if (risk.score < 20) {
      riskLevel = 'Low';
      riskColor = '#10B981';
      riskDescription = 'Your risk of stroke is low based on the information provided. Continue maintaining healthy habits.';
    } else if (risk.score < 60) {
      riskLevel = 'Moderate';
      riskColor = '#F59E0B';
      riskDescription = 'You have some risk factors for stroke. Consider lifestyle modifications to reduce your risk.';
    } else {
      riskLevel = 'High';
      riskColor = '#EF4444';
      riskDescription = 'Your risk of stroke is high. Please consult a healthcare provider immediately.';
    }

    // Calculate 10-year risk using modified Framingham
    let tenYearRisk = 0;
    if (risk.score < 20) tenYearRisk = 5;
    else if (risk.score < 40) tenYearRisk = 12;
    else if (risk.score < 60) tenYearRisk = 25;
    else tenYearRisk = 40;

    const report = {
      generated: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      patientInfo: {
        age: formData.age,
        sex: formData.sex || 'Not specified',
        ethnicity: formData.ethnicity || 'Not specified',
        maritalStatus: formData.maritalStatus || 'Not specified',
        bmi: bmi,
        bmiCategory: bmiCategory,
        bmiColor: bmiColor,
        height: formData.height,
        weight: formData.weight
      },
      vitalSigns: {
        bloodPressure: formData.systolic && formData.diastolic 
          ? `${formData.systolic}/${formData.diastolic}`
          : 'Not provided',
        glucose: formData.glucose || 'Not provided',
        bpStatus: formData.systolic && formData.diastolic 
          ? (parseInt(formData.systolic) >= 140 || parseInt(formData.diastolic) >= 90 
            ? 'Elevated' 
            : parseInt(formData.systolic) >= 130 || parseInt(formData.diastolic) >= 80
              ? 'Borderline'
              : 'Normal')
          : 'Unknown'
      },
      risk: {
        score: risk.score,
        level: riskLevel,
        color: riskColor,
        description: riskDescription,
        tenYearRisk: tenYearRisk,
        factors: risk.factors
      },
      recommendations: generateRecommendations(risk.factors, formData),
      disclaimer: "This assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
    };

    setReportData(report);
    return report;
  };

  // ---------- Generate Recommendations ----------
  const generateRecommendations = (factors, data) => {
    const recommendations = [];
    const added = new Set();

    // Blood pressure recommendations
    if (data.hasHighBP === 'Yes' || (data.systolic && parseInt(data.systolic) >= 130)) {
      recommendations.push({
        category: 'Blood Pressure',
        icon: <FaHeartbeat />,
        color: '#E63E4E',
        items: [
          'Monitor blood pressure regularly at home',
          'Reduce sodium intake (avoid adding salt to meals)',
          'Take medications exactly as prescribed',
          'Consider the DASH diet (rich in fruits, vegetables, low-fat dairy)'
        ]
      });
      added.add('bp');
    }

    // Diabetes recommendations
    if (data.hasDiabetes === 'Yes' || (data.glucose && parseInt(data.glucose) > 100)) {
      recommendations.push({
        category: 'Blood Sugar Management',
        icon: <FaTint />,
        color: '#10B981',
        items: [
          'Monitor blood glucose levels regularly',
          'Limit sugary drinks and desserts',
          'Choose complex carbohydrates (brown rice, whole grains)',
          'Eat meals at consistent times each day'
        ]
      });
      added.add('diabetes');
    }

    // Smoking recommendations
    if (data.smokingStatus === 'Current smoker') {
      recommendations.push({
        category: 'Smoking Cessation',
        icon: <FaSmoking />,
        color: '#F59E0B',
        items: [
          'Consider nicotine replacement therapy (patches, gum)',
          'Join a smoking cessation program',
          'Identify triggers and avoid them',
          'Talk to your doctor about prescription options'
        ]
      });
      added.add('smoking');
    }

    // Diet recommendations
    if (data.diet?.includes('salty') || data.diet?.includes('fatty') || data.diet?.includes('sugary')) {
      recommendations.push({
        category: 'Dietary Improvements',
        icon: <FaApple />,
        color: '#8B5CF6',
        items: [
          'Limit processed foods and fast food',
          data.diet?.includes('salty') ? 'Reduce prahok, soy sauce, and salty snacks' : '',
          data.diet?.includes('fatty') ? 'Choose lean proteins and limit fried foods' : '',
          data.diet?.includes('sugary') ? 'Replace sugary drinks with water or unsweetened tea' : '',
          'Aim for at least 5 servings of fruits and vegetables daily'
        ].filter(item => item !== '')
      });
    }

    // Physical activity recommendations
    if (data.physicalActivity?.includes('Sedentary') || data.physicalActivity?.includes('Light')) {
      recommendations.push({
        category: 'Physical Activity',
        icon: <FaHeartbeat />,
        color: '#EC4899',
        items: [
          'Start with 10-15 minute walks daily',
          'Gradually increase to 30 minutes, 5 days per week',
          'Incorporate strength training 2 days per week',
          'Try activities you enjoy (walking, swimming, cycling)'
        ]
      });
    }

    // Sleep & stress recommendations
    if (data.sleepStress === 'Rarely' || data.sleepStress === 'Sometimes') {
      recommendations.push({
        category: 'Sleep & Stress Management',
        icon: <FaBed />,
        color: '#6366F1',
        items: [
          'Maintain a consistent sleep schedule',
          'Practice deep breathing or meditation for 5-10 minutes daily',
          'Limit screen time before bed',
          'Consider talking to someone about stressors'
        ]
      });
    }

    // Weight management
    const bmi = parseFloat(calculateBMI());
    if (bmi > 25) {
      recommendations.push({
        category: 'Weight Management',
        icon: <FaWeight />,
        color: '#14B8A6',
        items: [
          'Aim for gradual weight loss (0.5-1 kg per week)',
          'Combine healthy eating with regular physical activity',
          'Keep a food diary to track intake',
          'Consider consulting a nutritionist'
        ]
      });
    }

    // Family history
    if (data.familyStroke === 'Yes' || data.familyHeart === 'Yes') {
      recommendations.push({
        category: 'Family History Awareness',
        icon: <FaUsers />,
        color: '#A855F7',
        items: [
          'Share your family history with your doctor',
          'Get regular health screenings',
          'Be vigilant about controlling modifiable risk factors',
          'Consider genetic counseling if appropriate'
        ]
      });
    }

    // Always include general prevention
    if (recommendations.length < 3) {
      recommendations.push({
        category: 'General Prevention',
        icon: <FaShieldAlt />,
        color: '#64748B',
        items: [
          'Schedule regular check-ups with your healthcare provider',
          'Know the FAST signs of stroke (Face drooping, Arm weakness, Speech difficulty, Time to call emergency)',
          'Maintain a healthy lifestyle',
          'Stay informed about your health metrics'
        ]
      });
    }

    return recommendations;
  };

  // ---------- Handle Input Changes ----------
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Handle conditional fields
    if (field === 'hasHighBP') {
      setShowBpMedication(value === 'Yes');
      if (value !== 'Yes') setFormData(prev => ({ ...prev, bpMedication: '' }));
    }
    
    if (field === 'hasDiabetes') {
      setShowDiabetesMedication(value === 'Yes');
      if (value !== 'Yes') setFormData(prev => ({ ...prev, diabetesMedication: '' }));
    }
    
    if (field === 'smokingStatus') {
      setShowCigarettes(value === 'Current smoker');
      if (value !== 'Current smoker') setFormData(prev => ({ ...prev, cigarettesPerDay: '' }));
    }
    
    if (field === 'knowsBP') {
      setShowBpInputs(value === 'I know it');
      if (value !== 'I know it') setFormData(prev => ({ ...prev, systolic: '', diastolic: '' }));
    }
    
    if (field === 'knowsGlucose') {
      setShowGlucoseInput(value === 'I know it');
      if (value !== 'I know it') setFormData(prev => ({ ...prev, glucose: '' }));
    }

    // Calculate progress
    calculateProgress();
  };

  // ---------- Calculate Form Progress ----------
  const calculateProgress = () => {
    let completed = 0;
    let total = 0;
    
    // Count total fields and completed fields
    sections.forEach(section => {
      section.questions.forEach(q => {
        if (q.type === 'dual-slider') {
          total += 2;
          if (formData.height) completed++;
          if (formData.weight) completed++;
        } else if (q.type === 'bp-input') {
          total += 1;
          if (formData.knowsBP) completed++;
          if (formData.knowsBP === 'I know it' && formData.systolic && formData.diastolic) completed += 2;
        } else if (q.type === 'glucose-input') {
          total += 1;
          if (formData.knowsGlucose) completed++;
          if (formData.knowsGlucose === 'I know it' && formData.glucose) completed++;
        } else if (q.type === 'smoking') {
          total += 1;
          if (formData.smokingStatus) completed++;
          if (formData.smokingStatus === 'Current smoker' && formData.cigarettesPerDay) completed++;
        } else {
          total += 1;
          if (formData[q.id]) completed++;
        }
      });
    });
    
    setProgress(Math.min(Math.round((completed / total) * 100), 100));
  };

  // ---------- Navigation ----------
  const goToNext = () => {
    if (currentStep < sections[currentSection - 1].questions.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      setCurrentStep(sections[currentSection - 2].questions.length);
    }
  };

  // ---------- Submit Form ----------
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      const report = generateReport();
      setReportData(report);
      setIsSubmitting(false);
      setShowResults(true);
    }, 3000);
  };

  // ---------- Reset Form ----------
  const handleReset = () => {
    setCurrentSection(1);
    setCurrentStep(1);
    setShowResults(false);
    setShowFullReport(false);
    setProgress(0);
    setFormData({
      age: 35,
      sex: '',
      ethnicity: '',
      maritalStatus: '',
      height: 170,
      weight: 70,
      residenceType: '',
      familyStroke: '',
      familyHeart: '',
      familyDiabetes: '',
      hasHighBP: '',
      bpMedication: '',
      hasHeartDisease: '',
      hasDiabetes: '',
      diabetesMedication: '',
      knowsBP: 'unknown',
      systolic: '',
      diastolic: '',
      knowsGlucose: 'unknown',
      glucose: '',
      smokingStatus: '',
      cigarettesPerDay: '',
      alcoholConsumption: '',
      diet: '',
      physicalActivity: '',
      sleepStress: ''
    });
  };

  // ---------- Handle View Full Report ----------
  const handleViewFullReport = () => {
    if (!reportData) {
      generateReport();
    }
    setShowFullReport(true);
  };

  // ---------- Handle Print Report ----------
  const handlePrintReport = () => {
    window.print();
  };

  // ---------- Handle Download Report ----------
  const handleDownloadReport = () => {
    const reportText = `
STROKIFY HEALTH ASSESSMENT REPORT
Generated: ${reportData?.generated}

PATIENT INFORMATION
Age: ${reportData?.patientInfo.age}
Sex: ${reportData?.patientInfo.sex}
BMI: ${reportData?.patientInfo.bmi} (${reportData?.patientInfo.bmiCategory})

VITAL SIGNS
Blood Pressure: ${reportData?.vitalSigns.bloodPressure}
Blood Glucose: ${reportData?.vitalSigns.glucose}

RISK ASSESSMENT
Overall Risk: ${reportData?.risk.level} (${reportData?.risk.score}%)
10-Year Stroke Risk: ${reportData?.risk.tenYearRisk}%

RISK FACTORS
${reportData?.risk.factors.map(f => `- ${f.factor} (${f.impact} impact)`).join('\n')}

RECOMMENDATIONS
${reportData?.recommendations.map(r => `${r.category}:\n${r.items.map(i => `  - ${i}`).join('\n')}`).join('\n\n')}

DISCLAIMER
${reportData?.disclaimer}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strokify-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Get Current Question ----------
  const currentSectionData = sections[currentSection - 1];
  const currentQuestionData = currentSectionData?.questions[currentStep - 1];

  // ---------- Render Question by Type ----------
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'slider':
        // SAFE VALUE EXTRACTION - prevents 20100 from showing
        let sliderValue = formData[question.id];
        
        // Check if value is valid (between min and max)
        if (sliderValue === undefined || 
            sliderValue === null || 
            isNaN(sliderValue) || 
            sliderValue < question.min || 
            sliderValue > question.max) {
          // Reset to default value (35 for age, or min for others)
          sliderValue = question.id === 'age' ? 35 : question.min;
          // Update form data to fix it permanently
          setTimeout(() => {
            handleInputChange(question.id, sliderValue);
          }, 0);
        }
        
        // FORCE min and max to be numbers
        const minValue = Number(question.min);
        const maxValue = Number(question.max);
        
        return (
          <div className="slider-container">
            <div className="slider-value">
              <span className="slider-number">{sliderValue}</span>
              <span className="slider-unit">{question.unit}</span>
            </div>
            <input
              type="range"
              min={minValue}
              max={maxValue}
              value={sliderValue}
              onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>{minValue}</span>
              <span>{maxValue}</span>
            </div>
          </div>
        );

      case 'dual-slider':
        return (
          <div className="dual-slider-container">
            <div className="bmi-indicator">
              <span className="bmi-label">Your BMI</span>
              <span className="bmi-value">{calculateBMI()}</span>
            </div>
            
            <div className="slider-group">
              <label>Height (cm)</label>
              <div className="slider-value-mini">
                <span>{formData.height || 170} cm</span>
              </div>
              <input
                type="range"
                min={question.heightMin}
                max={question.heightMax}
                value={formData.height || 170}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                className="slider"
              />
            </div>
            
            <div className="slider-group">
              <label>Weight (kg)</label>
              <div className="slider-value-mini">
                <span>{formData.weight || 70} kg</span>
              </div>
              <input
                type="range"
                min={question.weightMin}
                max={question.weightMax}
                value={formData.weight || 70}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        );

      case 'options':
      case 'yes-no':
        return (
          <div className="options-grid">
            {question.options ? (
              question.options.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${formData[question.id] === option ? 'selected' : ''}`}
                  onClick={() => handleInputChange(question.id, option)}
                >
                  {option}
                  {formData[question.id] === option && <FaCheck className="check-icon" />}
                </button>
              ))
            ) : (
              <>
                <button
                  className={`option-btn ${formData[question.id] === 'Yes' ? 'selected' : ''}`}
                  onClick={() => handleInputChange(question.id, 'Yes')}
                >
                  Yes
                  {formData[question.id] === 'Yes' && <FaCheck className="check-icon" />}
                </button>
                <button
                  className={`option-btn ${formData[question.id] === 'No' ? 'selected' : ''}`}
                  onClick={() => handleInputChange(question.id, 'No')}
                >
                  No
                  {formData[question.id] === 'No' && <FaCheck className="check-icon" />}
                </button>
              </>
            )}
          </div>
        );

      case 'smoking':
        return (
          <>
            <div className="options-grid">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${formData.smokingStatus === option ? 'selected' : ''}`}
                  onClick={() => handleInputChange('smokingStatus', option)}
                >
                  {option}
                  {formData.smokingStatus === option && <FaCheck className="check-icon" />}
                </button>
              ))}
            </div>
            
            {showCigarettes && (
              <div className="conditional-field">
                <label className="conditional-label">How many cigarettes per day?</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.cigarettesPerDay}
                  onChange={(e) => handleInputChange('cigarettesPerDay', e.target.value)}
                  placeholder="e.g., 10"
                  className="number-input"
                />
              </div>
            )}
          </>
        );

      case 'bp-input':
        return (
          <>
            <div className="options-grid">
              <button
                className={`option-btn ${formData.knowsBP === 'I don’t know' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsBP', 'I don’t know')}
              >
                I don’t know
                {formData.knowsBP === 'I don’t know' && <FaCheck className="check-icon" />}
              </button>
              <button
                className={`option-btn ${formData.knowsBP === 'I know it' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsBP', 'I know it')}
              >
                I know it
                {formData.knowsBP === 'I know it' && <FaCheck className="check-icon" />}
              </button>
            </div>
            
            {showBpInputs && (
              <div className="bp-inputs">
                <div className="bp-field">
                  <label>Systolic</label>
                  <input
                    type="number"
                    placeholder="120"
                    value={formData.systolic}
                    onChange={(e) => handleInputChange('systolic', e.target.value)}
                    className="number-input"
                  />
                  <span className="bp-unit">mmHg</span>
                </div>
                <div className="bp-field">
                  <label>Diastolic</label>
                  <input
                    type="number"
                    placeholder="80"
                    value={formData.diastolic}
                    onChange={(e) => handleInputChange('diastolic', e.target.value)}
                    className="number-input"
                  />
                  <span className="bp-unit">mmHg</span>
                </div>
              </div>
            )}
          </>
        );

      case 'glucose-input':
        return (
          <>
            <div className="options-grid">
              <button
                className={`option-btn ${formData.knowsGlucose === 'I don’t know' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsGlucose', 'I don’t know')}
              >
                I don’t know
                {formData.knowsGlucose === 'I don’t know' && <FaCheck className="check-icon" />}
              </button>
              <button
                className={`option-btn ${formData.knowsGlucose === 'I know it' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsGlucose', 'I know it')}
              >
                I know it
                {formData.knowsGlucose === 'I know it' && <FaCheck className="check-icon" />}
              </button>
            </div>
            
            {showGlucoseInput && (
              <div className="glucose-input">
                <input
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.glucose}
                  onChange={(e) => handleInputChange('glucose', e.target.value)}
                  className="number-input"
                />
                <span className="glucose-unit">mg/dL</span>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  // ---------- Conditional Field Render ----------
  const renderConditionalField = () => {
    if (!currentQuestionData?.conditional) return null;
    
    const conditionField = currentQuestionData.conditionField;
    const conditionLabel = currentQuestionData.conditionLabel;
    
    if ((currentQuestionData.id === 'hasHighBP' && !showBpMedication) ||
        (currentQuestionData.id === 'hasDiabetes' && !showDiabetesMedication)) {
      return null;
    }
    
    return (
      <div className="conditional-section">
        <label className="conditional-label">{conditionLabel}</label>
        <div className="options-grid">
          <button
            className={`option-btn ${formData[conditionField] === 'Yes' ? 'selected' : ''}`}
            onClick={() => handleInputChange(conditionField, 'Yes')}
          >
            Yes
            {formData[conditionField] === 'Yes' && <FaCheck className="check-icon" />}
          </button>
          <button
            className={`option-btn ${formData[conditionField] === 'No' ? 'selected' : ''}`}
            onClick={() => handleInputChange(conditionField, 'No')}
          >
            No
            {formData[conditionField] === 'No' && <FaCheck className="check-icon" />}
          </button>
        </div>
      </div>
    );
  };

  // ---------- Full Report View ----------
  if (showFullReport && reportData) {
    return (
      <div className="symptom-detector">
        <div className="full-report-container">
          <div className="report-header">
            <button className="report-back-btn" onClick={() => setShowFullReport(false)}>
              <FaArrowLeft /> Back to Summary
            </button>
            <div className="report-actions">
              <button className="report-action-btn" onClick={handlePrintReport}>
                <FaPrint /> Print
              </button>
              <button className="report-action-btn" onClick={handleDownloadReport}>
                <FaDownload /> Download
              </button>
              <button className="report-action-btn">
                <FaShare /> Share
              </button>
            </div>
          </div>

          <div className="report-card">
            <div className="report-brand">
              <div className="report-logo">STROKIFY</div>
              <div className="report-date">Generated: {reportData.generated}</div>
            </div>

            <div className="report-title-section">
              <FaFileAlt className="report-icon" />
              <h1 className="report-title">Comprehensive Health Assessment Report</h1>
              <p className="report-subtitle">Stroke Risk Evaluation & Personalized Recommendations</p>
            </div>

            {/* Risk Summary */}
            <div className="report-section">
              <h2 className="report-section-title">Risk Summary</h2>
              <div className="risk-summary-card" style={{ borderLeftColor: reportData.risk.color }}>
                <div className="risk-summary-header">
                  <div>
                    <span className="risk-level-label">Overall Stroke Risk</span>
                    <span className="risk-level-value" style={{ color: reportData.risk.color }}>
                      {reportData.risk.level}
                    </span>
                  </div>
                  <span className="risk-score">{reportData.risk.score}%</span>
                </div>
                <div className="risk-meter-large">
                  <div className="risk-bar-large">
                    <div 
                      className="risk-progress-large" 
                      style={{ width: `${reportData.risk.score}%`, backgroundColor: reportData.risk.color }}
                    ></div>
                  </div>
                  <div className="risk-scale">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
                <p className="risk-description">{reportData.risk.description}</p>
                <div className="ten-year-risk">
                  <span className="ten-year-label">10-Year Stroke Risk:</span>
                  <span className="ten-year-value" style={{ color: reportData.risk.color }}>
                    {reportData.risk.tenYearRisk}%
                  </span>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="report-section">
              <h2 className="report-section-title">Patient Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{reportData.patientInfo.age} years</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Sex</span>
                  <span className="info-value">{reportData.patientInfo.sex}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ethnicity</span>
                  <span className="info-value">{reportData.patientInfo.ethnicity}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Marital Status</span>
                  <span className="info-value">{reportData.patientInfo.maritalStatus}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Height</span>
                  <span className="info-value">{reportData.patientInfo.height} cm</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Weight</span>
                  <span className="info-value">{reportData.patientInfo.weight} kg</span>
                </div>
                <div className="info-item">
                  <span className="info-label">BMI</span>
                  <span className="info-value" style={{ color: reportData.patientInfo.bmiColor }}>
                    {reportData.patientInfo.bmi} ({reportData.patientInfo.bmiCategory})
                  </span>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="report-section">
              <h2 className="report-section-title">Vital Signs</h2>
              <div className="vitals-grid">
                <div className="vital-card">
                  <FaHeartbeat className="vital-icon" style={{ color: '#E63E4E' }} />
                  <div>
                    <div className="vital-label">Blood Pressure</div>
                    <div className="vital-value">{reportData.vitalSigns.bloodPressure}</div>
                    <div className="vital-status" style={{ 
                      color: reportData.vitalSigns.bpStatus === 'Normal' ? '#10B981' : 
                             reportData.vitalSigns.bpStatus === 'Borderline' ? '#F59E0B' : '#EF4444'
                    }}>
                      {reportData.vitalSigns.bpStatus}
                    </div>
                  </div>
                </div>
                <div className="vital-card">
                  <FaTint className="vital-icon" style={{ color: '#10B981' }} />
                  <div>
                    <div className="vital-label">Blood Glucose</div>
                    <div className="vital-value">{reportData.vitalSigns.glucose}</div>
                    <div className="vital-status" style={{ 
                      color: reportData.vitalSigns.glucose !== 'Not provided' && 
                             parseInt(reportData.vitalSigns.glucose) > 125 ? '#EF4444' : 
                             parseInt(reportData.vitalSigns.glucose) > 100 ? '#F59E0B' : '#10B981'
                    }}>
                      {reportData.vitalSigns.glucose !== 'Not provided' ? 
                       (parseInt(reportData.vitalSigns.glucose) > 125 ? 'High' : 
                        parseInt(reportData.vitalSigns.glucose) > 100 ? 'Borderline' : 'Normal') 
                       : 'Not measured'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="report-section">
              <h2 className="report-section-title">Identified Risk Factors</h2>
              <div className="risk-factors-list">
                {reportData.risk.factors.map((factor, index) => (
                  <div key={index} className="risk-factor-item">
                    <div className="risk-factor-header">
                      <span className="risk-factor-name">{factor.factor}</span>
                      <span className={`risk-factor-impact ${factor.impact}`}>
                        {factor.impact} • +{factor.points} points
                      </span>
                    </div>
                    <div className="risk-factor-bar">
                      <div 
                        className="risk-factor-progress"
                        style={{ 
                          width: `${(factor.points / 25) * 100}%`,
                          backgroundColor: factor.impact === 'high' ? '#EF4444' : 
                                         factor.impact === 'moderate' ? '#F59E0B' : '#10B981'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="report-section">
              <h2 className="report-section-title">Personalized Recommendations</h2>
              <div className="recommendations-grid">
                {reportData.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-header" style={{ color: rec.color }}>
                      {rec.icon}
                      <h3>{rec.category}</h3>
                    </div>
                    <ul className="recommendation-list">
                      {rec.items.map((item, i) => (
                        <li key={i}>
                          <FaCheck className="recommendation-check" style={{ color: rec.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* FAST Signs */}
            <div className="report-section">
              <h2 className="report-section-title">Stroke Warning Signs (FAST)</h2>
              <div className="fast-grid">
                <div className="fast-card">
                  <div className="fast-letter">F</div>
                  <div className="fast-content">
                    <strong>Face Drooping</strong>
                    <p>Does one side of the face droop or is it numb? Ask the person to smile.</p>
                  </div>
                </div>
                <div className="fast-card">
                  <div className="fast-letter">A</div>
                  <div className="fast-content">
                    <strong>Arm Weakness</strong>
                    <p>Is one arm weak or numb? Ask the person to raise both arms.</p>
                  </div>
                </div>
                <div className="fast-card">
                  <div className="fast-letter">S</div>
                  <div className="fast-content">
                    <strong>Speech Difficulty</strong>
                    <p>Is speech slurred? Ask the person to repeat a simple sentence.</p>
                  </div>
                </div>
                <div className="fast-card">
                  <div className="fast-letter">T</div>
                  <div className="fast-content">
                    <strong>Time to Call Emergency</strong>
                    <p>If someone shows any of these symptoms, call 911 immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="report-disclaimer">
              <FaInfoCircle />
              <p>{reportData.disclaimer}</p>
            </div>

            <div className="report-footer">
              <button className="btn-primary" onClick={() => setShowFullReport(false)}>
                Back to Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Results View ----------
  if (showResults) {
    const risk = reportData || generateReport();
    
    return (
      <div className="symptom-detector">
        <div className="results-container">
          <div className="results-card">
            <div className="results-icon">
              <FaHeartbeat />
            </div>
            <h1 className="results-title">Analysis Complete</h1>
            <p className="results-subtitle">
              Your symptom analysis has been processed by our AI
            </p>
            
            <div className="risk-meter">
              <div className="risk-label">
                <span>Stroke Risk Level</span>
                <span className="risk-value" style={{ color: risk.risk.color }}>{risk.risk.level}</span>
              </div>
              <div className="risk-bar">
                <div 
                  className="risk-progress" 
                  style={{ width: `${risk.risk.score}%`, backgroundColor: risk.risk.color }}
                ></div>
              </div>
            </div>
            
            <div className="results-details">
              <div className="detail-item">
                <span className="detail-label">BMI</span>
                <span className="detail-value">{calculateBMI()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Blood Pressure</span>
                <span className="detail-value">
                  {formData.systolic && formData.diastolic 
                    ? `${formData.systolic}/${formData.diastolic}`
                    : 'Not provided'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Risk Factors</span>
                <span className="detail-value">{risk.risk.factors.length} identified</span>
              </div>
            </div>
            
            <div className="risk-summary-text">
              <p>{risk.risk.description}</p>
            </div>
            
            <div className="results-actions">
              <button className="btn-primary" onClick={handleReset}>
                Start New Assessment
              </button>
              <button className="btn-secondary" onClick={handleViewFullReport}>
                <FaFileAlt /> View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Main Form View ----------
  return (
    <div className="symptom-detector">
      {/* COMPACT HEADER - FIXED VERSION */}
      <div className="detector-header">
        <div className="header-content">
          <div className="section-info-compact">
            <span className="section-pill">Section {currentSection}/3</span>
            <span className="section-title-compact">{currentSectionData?.title || 'Loading...'}</span>
          </div>
          
          <div className="progress-compact">
            <div className="progress-text">
              <span className="progress-number">{progress}%</span>
            </div>
            <div className="progress-bar-compact">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-container">
        <div className="question-card">
          <div 
            className="section-badge"
            style={{ backgroundColor: `${currentSectionData?.color}15`, color: currentSectionData?.color }}
          >
            {currentSectionData?.icon}
            <span>{currentSectionData?.title}</span>
          </div>
          
          <div className="question-content">
            <div className="question-icon-wrapper">
              <div 
                className="question-icon"
                style={{ backgroundColor: `${currentSectionData?.color}15`, color: currentSectionData?.color }}
              >
                {currentQuestionData?.icon}
              </div>
            </div>
            
            <h2 className="question-text">
              {currentQuestionData?.label}
            </h2>
            
            <div className="question-input">
              {renderQuestion(currentQuestionData)}
              {renderConditionalField()}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="navigation-footer">
            <button 
              className={`nav-btn back ${currentSection === 1 && currentStep === 1 ? 'disabled' : ''}`}
              onClick={goToPrevious}
              disabled={currentSection === 1 && currentStep === 1}
            >
              <FaArrowLeft /> Back
            </button>
            
            <div className="step-indicator">
              {currentSectionData?.questions.map((_, index) => (
                <div 
                  key={index}
                  className={`step-dot ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
                />
              ))}
            </div>
            
            <button 
              className="nav-btn next"
              onClick={goToNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : currentSection === 3 && currentStep === currentSectionData?.questions.length ? 'Submit' : 'Next'}
              {!isSubmitting && <FaArrowRight />}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-card">
            <div className="spinner-large"></div>
            <h3 className="loading-title">Analyzing Your Health Profile</h3>
            <p className="loading-subtitle">
              Our AI is processing your responses...
            </p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomDetector;