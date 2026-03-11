import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import {
  FaUser, FaHeart, FaLungs, FaWineBottle, FaApple,
  FaBed, FaArrowRight, FaArrowLeft, FaCheck, FaBrain,
  FaHeartbeat, FaTint, FaSmoking, FaWeight, FaRuler,
  FaUsers, FaMapMarkerAlt, FaInfoCircle, FaShieldAlt,
  FaFileAlt, FaDownload, FaExclamationTriangle
} from 'react-icons/fa';
import '../styles/SymptomDetector.css';

const SymptomDetector = () => {
  const [currentStep, setCurrentStep]         = useState(1);
  const [currentSection, setCurrentSection]   = useState(1);
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [showResults, setShowResults]         = useState(false);
  const [showFullReport, setShowFullReport]   = useState(false);
  const [progress, setProgress]               = useState(0);
  const [reportData, setReportData]           = useState(null);

  const [formData, setFormData] = useState({
  age: 35, sex: '', ethnicity: '', maritalStatus: '',
  height: 170, weight: 70, residenceType: '',
  familyStroke: '', familyHeart: '', familyDiabetes: '',
  hasHighBP: '', bpMedication: '', hasHeartDisease: '',
  hasDiabetes: '', diabetesMedication: '',
  knowsBP: 'unknown', systolic: '', diastolic: '',
  knowsGlucose: 'unknown', glucose: '',
  excessiveThirst: '', frequentFatigue: '', blurredVision: '', sugarIntake: '',  // ADD THESE
  smokingStatus: '', cigarettesPerDay: '',
  workType: '', alcoholConsumption: '', diet: '', physicalActivity: '', sleepStress: ''
});

  const [showBpMedication, setShowBpMedication]             = useState(false);
  const [showDiabetesMedication, setShowDiabetesMedication] = useState(false);
  const [showCigarettes, setShowCigarettes]                 = useState(false);
  const [showBpInputs, setShowBpInputs]                     = useState(false);
  const [showGlucoseInput, setShowGlucoseInput]             = useState(false);
  const [showGlucoseFollowUp, setShowGlucoseFollowUp] = useState(false);

  useEffect(() => {
    if (!formData.age || formData.age < 20 || formData.age > 100 || isNaN(formData.age)) {
      setFormData(prev => ({ ...prev, age: 35 }));
    }
  }, []);

  const handleGlucoseSelection = (value) => {
  setFormData(prev => ({ ...prev, knowsGlucose: value }));
  setShowGlucoseInput(value === 'I know it');
  setShowGlucoseFollowUp(value === "I don't know");
  
  // Clear follow-up answers if user switches back to "I know it"
  if (value === 'I know it') {
    setFormData(prev => ({
      ...prev,
      excessiveThirst: '',
      frequentFatigue: '',
      blurredVision: '',
      sugarIntake: ''
    }));
  }
};

  // ─── Sections / Questions ────────────────────────────────────────────────────
  const sections = [
    {
      id: 1, title: 'Personal Profile', icon: <FaUser />, color: '#E63E4E',
      questions: [
        { id: 'age',          type: 'slider',      label: 'What is your age?',                    icon: <FaUser />,         min: 20, max: 100, unit: 'years' },
        { id: 'sex',          type: 'options',     label: 'What is your gender?',                 icon: <FaUser />,         options: ['Male', 'Female', 'Prefer not to say'] },
        { id: 'ethnicity',    type: 'options',     label: 'What is your ethnicity?',              icon: <FaUsers />,        options: ['Khmer', 'Vietnamese', 'Chinese', 'Other'] },
        { id: 'maritalStatus',type: 'options',     label: 'What is your marital status?',         icon: <FaHeart />,        options: ['Single', 'Married', 'Divorced', 'Widowed'] },
        { id: 'heightWeight', type: 'dual-slider', label: 'What is your height and weight?',      icon: <FaRuler />,        heightMin: 140, heightMax: 220, weightMin: 40, weightMax: 150 },
        { id: 'residenceType',type: 'options',     label: 'What type of residence do you currently live in?ℹ', icon: <FaMapMarkerAlt />, options: ['Urban', 'Rural'] }
      ]
    },
    {
      id: 2, title: 'Medical History', icon: <FaHeartbeat />, color: '#10B981',
      questions: [
        { id: 'familyStroke',    type: 'yes-no', label: 'Has anyone in your immediate family ever had a stroke?',              icon: <FaBrain /> },
        { id: 'familyHeart',     type: 'yes-no', label: 'Has anyone in your immediate family ever had heart disease?',         icon: <FaHeartbeat /> },
        { id: 'familyDiabetes',  type: 'yes-no', label: 'Has anyone in your immediate family ever been diagnosed with diabetes?', icon: <FaTint /> },
        { id: 'hasHighBP',       type: 'yes-no', label: 'Have you ever been diagnosed with high blood pressure?',              icon: <FaHeartbeat />, conditional: true, conditionField: 'bpMedication',       conditionLabel: 'Do you take medication for it regularly?' },
        { id: 'hasHeartDisease', type: 'yes-no', label: 'Have you ever been diagnosed with any heart condition?',              icon: <FaHeart /> },
        { id: 'hasDiabetes',     type: 'yes-no', label: 'Have you ever been diagnosed with diabetes or high blood sugar?',     icon: <FaTint />,      conditional: true, conditionField: 'diabetesMedication', conditionLabel: 'Do you take medication for it (pills or insulin)?' },
        { id: 'knowsBP',         type: 'bp-input',      label: 'Do you know your recent blood pressure reading?',             icon: <FaHeartbeat /> },
        { id: 'knowsGlucose',    type: 'glucose-input', label: 'Do you know your recent blood glucose level?',               icon: <FaTint /> }
      ]
    },
    {
      id: 3, title: 'Lifestyle & Habits', icon: <FaLungs />, color: '#F59E0B',
      questions: [
        { 
          id: 'smokingStatus',     
          type: 'options', 
          label: 'Have you smoked over the past year?',                                     
          icon: <FaSmoking />,   
          options: ['Never smoked', 'Smokes'] 
        },
        { 
          id: 'workType',
          type: 'options', 
          label: 'What is your main type of work?',                               
          icon: <FaUsers />,
          options: ['Never worked', 'Children', 'Government job', 'Self-employed', 'Private']
        },
        { 
          id: 'alcoholConsumption',
          type: 'options', 
          label: 'How often do you drink alcohol?',                               
          icon: <FaWineBottle />,
          options: ['Never', 'Occasionally (e.g., social events)', 'Regularly (1–2 times/week)', 'Frequently (3+ times/week)']
        },
        { 
          id: 'diet',              
          type: 'options', 
          label: 'Which best describes your daily diet?',                           
          icon: <FaApple />,     
          options: [
            'Balanced (fruits, vegetables, lean protein)', 
            'High in salty foods (e.g., prahok, processed foods)', 
            'High in fatty foods (e.g., fried foods, fatty meats)', 
            'High in sugary foods & drinks'
          ] 
        },
        { 
          id: 'physicalActivity',  
          type: 'options', 
          label: 'How often do you do moderate exercise (e.g., brisk walking, cycling)?ℹ',                         
          icon: <FaHeartbeat />, 
          options: ['Sedentary (little to no exercise)', 'Light (1-2 times/week)', 'Moderate (3-4 times/week)', 'Active (5+ times/week)']
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

  // ─── Derived progress counters ───────────────────────────────────────────────
  const totalQuestions = sections.reduce((sum, sec) => sum + sec.questions.length, 0);
  const currentQuestion =
    sections.slice(0, currentSection - 1).reduce((sum, sec) => sum + sec.questions.length, 0) +
    currentStep;
  const cardProgressPct = Math.round(((currentQuestion - 1) / totalQuestions) * 100);

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const h = formData.height / 100;
      return (formData.weight / (h * h)).toFixed(1);
    }
    return '—';
  };

  const calculateRiskScore = () => {
    let score = 0; let maxScore = 0; let factors = [];
    if (formData.age) {
      maxScore += 15;
      if (formData.age > 60)      { score += 15; factors.push({ factor: 'Age > 60',         impact: 'high',     points: 15 }); }
      else if (formData.age > 45) { score += 8;  factors.push({ factor: 'Age 45-60',        impact: 'moderate', points: 8  }); }
      else                        {               factors.push({ factor: 'Age < 45',         impact: 'low',      points: 0  }); }
    }
    if (formData.sex === 'Male')           { maxScore += 5;  score += 5;  factors.push({ factor: 'Male gender',                    impact: 'moderate', points: 5  }); }
    if (formData.familyStroke === 'Yes')   { maxScore += 15; score += 15; factors.push({ factor: 'Family history of stroke',       impact: 'high',     points: 15 }); }
    if (formData.familyHeart === 'Yes')    { maxScore += 10; score += 10; factors.push({ factor: 'Family history of heart disease', impact: 'moderate', points: 10 }); }
    if (formData.familyDiabetes === 'Yes') { maxScore += 10; score += 10; factors.push({ factor: 'Family history of diabetes',     impact: 'moderate', points: 10 }); }
    if (formData.hasHighBP === 'Yes') {
      maxScore += 20; score += 20; factors.push({ factor: 'Diagnosed hypertension', impact: 'high', points: 20 });
      if (formData.bpMedication === 'No') { maxScore += 10; score += 10; factors.push({ factor: 'Untreated hypertension', impact: 'high', points: 10 }); }
    }
    if (formData.systolic && formData.diastolic) {
      const sys = parseInt(formData.systolic), dia = parseInt(formData.diastolic);
      if (sys >= 140 || dia >= 90)      { maxScore += 15; score += 15; factors.push({ factor: 'Elevated blood pressure',  impact: 'high',     points: 15 }); }
      else if (sys >= 130 || dia >= 80) { maxScore += 8;  score += 8;  factors.push({ factor: 'Borderline hypertension', impact: 'moderate', points: 8  }); }
    }
    if (formData.hasHeartDisease === 'Yes') { maxScore += 15; score += 15; factors.push({ factor: 'Existing heart condition', impact: 'high', points: 15 }); }
    if (formData.hasDiabetes === 'Yes') {
      maxScore += 20; score += 20; factors.push({ factor: 'Diabetes', impact: 'high', points: 20 });
      if (formData.diabetesMedication === 'No') { maxScore += 5; score += 5; factors.push({ factor: 'Unmanaged diabetes', impact: 'moderate', points: 5 }); }
    }
    if (formData.glucose) {
      const g = parseInt(formData.glucose);
      if (g > 125)      { maxScore += 10; score += 10; factors.push({ factor: 'Elevated blood glucose', impact: 'high',     points: 10 }); }
      else if (g > 100) { maxScore += 5;  score += 5;  factors.push({ factor: 'Pre-diabetic range',     impact: 'moderate', points: 5  }); }
    }
    if (formData.smokingStatus === 'Current smoker') {
      maxScore += 25; score += 25; factors.push({ factor: 'Current smoker', impact: 'high', points: 25 });
      if (formData.cigarettesPerDay > 20) { score += 5; factors.push({ factor: 'Heavy smoker', impact: 'high', points: 5 }); }
    } else if (formData.smokingStatus === 'Former smoker') {
      maxScore += 10; score += 10; factors.push({ factor: 'Former smoker', impact: 'moderate', points: 10 });
    }
    if (formData.alcoholConsumption?.includes('Frequently'))  { maxScore += 15; score += 15; factors.push({ factor: 'Heavy alcohol use',   impact: 'high',     points: 15 }); }
    else if (formData.alcoholConsumption?.includes('Regularly')) { maxScore += 8; score += 8; factors.push({ factor: 'Regular alcohol use', impact: 'moderate', points: 8  }); }
    if (formData.diet?.includes('salty') || formData.diet?.includes('fatty') || formData.diet?.includes('sugary')) {
      maxScore += 15; score += 15; factors.push({ factor: 'Poor dietary habits', impact: 'moderate', points: 15 });
    }
    if (formData.physicalActivity?.includes('Sedentary')) { maxScore += 15; score += 15; factors.push({ factor: 'Sedentary lifestyle',   impact: 'moderate', points: 15 }); }
    else if (formData.physicalActivity?.includes('Light')) { maxScore += 5;  score += 5;  factors.push({ factor: 'Low physical activity', impact: 'low',      points: 5  }); }
    if (formData.sleepStress === 'Rarely')         { maxScore += 10; score += 10; factors.push({ factor: 'Poor sleep and high stress',       impact: 'moderate', points: 10 }); }
    else if (formData.sleepStress === 'Sometimes') { maxScore += 5;  score += 5;  factors.push({ factor: 'Occasional sleep/stress issues', impact: 'low',      points: 5  }); }
    return { score: Math.min(Math.round((score / (maxScore || 100)) * 100), 100), factors: factors.sort((a, b) => b.points - a.points), rawScore: score, maxScore: maxScore || 100 };
  };

  const getRiskMeta = (score) => {
    if (score < 20) return { level: 'Low',      color: '#10B981', description: 'Your risk of stroke is low based on the information provided. Continue maintaining healthy habits.', tenYearRisk: 5  };
    if (score < 60) return { level: 'Moderate', color: '#F59E0B', description: 'You have some risk factors for stroke. Consider lifestyle modifications to reduce your risk.',       tenYearRisk: 20 };
    return              { level: 'High',     color: '#EF4444', description: 'Your risk of stroke is high. Please consult a healthcare provider as soon as possible.',              tenYearRisk: 40 };
  };

  const generateRecommendations = (factors, data) => {
    const recs = [];
    const bmi = parseFloat(calculateBMI());
    if (data.hasHighBP === 'Yes' || (data.systolic && parseInt(data.systolic) >= 130))
      recs.push({ category: 'Blood Pressure',   icon: <FaHeartbeat />, color: '#E63E4E', items: ['Monitor blood pressure regularly at home', 'Reduce sodium intake', 'Take medications exactly as prescribed', 'Consider the DASH diet'] });
    if (data.hasDiabetes === 'Yes' || (data.glucose && parseInt(data.glucose) > 100))
      recs.push({ category: 'Blood Sugar',      icon: <FaTint />,      color: '#10B981', items: ['Monitor blood glucose levels regularly', 'Limit sugary drinks and desserts', 'Choose complex carbohydrates', 'Eat meals at consistent times'] });
    if (data.smokingStatus === 'Current smoker')
      recs.push({ category: 'Quit Smoking',     icon: <FaSmoking />,   color: '#F59E0B', items: ['Consider nicotine replacement therapy', 'Join a cessation program', 'Identify and avoid triggers', 'Talk to your doctor about options'] });
    if (data.diet?.includes('salty') || data.diet?.includes('fatty') || data.diet?.includes('sugary'))
      recs.push({ category: 'Diet',             icon: <FaApple />,     color: '#8B5CF6', items: ['Limit processed and fast food', 'Reduce salty condiments and snacks', 'Choose lean proteins', 'Aim for 5 servings of fruit and vegetables daily'] });
    if (data.physicalActivity?.includes('Sedentary') || data.physicalActivity?.includes('Light'))
      recs.push({ category: 'Physical Activity',icon: <FaHeartbeat />, color: '#EC4899', items: ['Start with 10-15 minute walks daily', 'Build up to 30 minutes, 5 days per week', 'Add strength training 2 days per week', 'Try activities you enjoy'] });
    if (data.sleepStress === 'Rarely' || data.sleepStress === 'Sometimes')
      recs.push({ category: 'Sleep and Stress', icon: <FaBed />,       color: '#6366F1', items: ['Maintain a consistent sleep schedule', 'Practice 5-10 min daily deep breathing', 'Limit screens before bed', 'Talk to someone about stressors'] });
    if (bmi > 25)
      recs.push({ category: 'Weight Management',icon: <FaWeight />,    color: '#14B8A6', items: ['Aim for gradual weight loss (0.5-1 kg/week)', 'Combine healthy eating with exercise', 'Keep a food diary', 'Consider consulting a nutritionist'] });
    if (data.familyStroke === 'Yes' || data.familyHeart === 'Yes')
      recs.push({ category: 'Family History',   icon: <FaUsers />,     color: '#A855F7', items: ['Share your family history with your doctor', 'Get regular health screenings', 'Control all modifiable risk factors', 'Consider genetic counseling'] });
    if (recs.length < 2)
      recs.push({ category: 'General Prevention',icon: <FaShieldAlt />,color: '#64748B', items: ['Schedule regular check-ups', 'Know the FAST stroke warning signs', 'Maintain a healthy lifestyle', 'Stay informed about your health metrics'] });
    return recs;
  };

  const generateReport = () => {
    const risk = calculateRiskScore();
    const meta = getRiskMeta(risk.score);
    const bmi = calculateBMI();
    const bmiNum = parseFloat(bmi);
    const bmiCategory = bmiNum < 18.5 ? 'Underweight' : bmiNum < 25 ? 'Healthy weight' : bmiNum < 30 ? 'Overweight' : 'Obese';
    const bmiColor    = bmiNum < 18.5 ? '#F59E0B'      : bmiNum < 25 ? '#10B981'       : bmiNum < 30 ? '#F59E0B'      : '#EF4444';
    const bpStatus = formData.systolic && formData.diastolic
      ? (parseInt(formData.systolic) >= 140 || parseInt(formData.diastolic) >= 90 ? 'Elevated'
        : parseInt(formData.systolic) >= 130 || parseInt(formData.diastolic) >= 80 ? 'Borderline' : 'Normal')
      : 'Unknown';
    const report = {
      generated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      patientInfo: { age: formData.age, sex: formData.sex || 'Not specified', ethnicity: formData.ethnicity || 'Not specified', maritalStatus: formData.maritalStatus || 'Not specified', bmi, bmiCategory, bmiColor, height: formData.height, weight: formData.weight },
      vitalSigns: { bloodPressure: formData.systolic && formData.diastolic ? `${formData.systolic}/${formData.diastolic}` : 'Not provided', glucose: formData.glucose || 'Not provided', bpStatus },
      risk: { ...risk, ...meta },
      recommendations: generateRecommendations(risk.factors, formData),
      disclaimer: 'This assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.'
    };
    setReportData(report);
    return report;
  };

  // ─── Input Handler ────────────────────────────────────────────────────────────
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'hasHighBP')     { setShowBpMedication(value === 'Yes');          if (value !== 'Yes')             setFormData(p => ({ ...p, bpMedication: '' })); }
    if (field === 'hasDiabetes')   { setShowDiabetesMedication(value === 'Yes');    if (value !== 'Yes')             setFormData(p => ({ ...p, diabetesMedication: '' })); }
    if (field === 'smokingStatus') { setShowCigarettes(value === 'Current smoker'); if (value !== 'Current smoker') setFormData(p => ({ ...p, cigarettesPerDay: '' })); }
    if (field === 'knowsBP')       { setShowBpInputs(value === 'I know it');        if (value !== 'I know it')       setFormData(p => ({ ...p, systolic: '', diastolic: '' })); }
    if (field === 'knowsGlucose')  { setShowGlucoseInput(value === 'I know it');    if (value !== 'I know it')       setFormData(p => ({ ...p, glucose: '' })); }
    calculateProgress();
  };

  const calculateProgress = () => {
    let completed = 0, total = 0;
    sections.forEach(sec => sec.questions.forEach(q => {
      if (q.type === 'dual-slider') { total += 2; if (formData.height) completed++; if (formData.weight) completed++; }
      else { total++; if (formData[q.id]) completed++; }
    }));
    setProgress(Math.min(Math.round((completed / total) * 100), 100));
  };

  // ─── Navigation ───────────────────────────────────────────────────────────────
  const goToNext = () => {
    if (currentStep < sections[currentSection - 1].questions.length) { setCurrentStep(s => s + 1); }
    else if (currentSection < sections.length)                        { setCurrentSection(s => s + 1); setCurrentStep(1); }
    else                                                               { handleSubmit(); }
  };

  const goToPrevious = () => {
    if (currentStep > 1)         { setCurrentStep(s => s - 1); }
    else if (currentSection > 1) { setCurrentSection(s => s - 1); setCurrentStep(sections[currentSection - 2].questions.length); }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => { const r = generateReport(); setReportData(r); setIsSubmitting(false); setShowResults(true); }, 3000);
  };

  const handleReset = () => {
    setCurrentSection(1); setCurrentStep(1); setShowResults(false); setShowFullReport(false); setProgress(0);
    setFormData({ age:35, sex:'', ethnicity:'', maritalStatus:'', height:170, weight:70, residenceType:'', familyStroke:'', familyHeart:'', familyDiabetes:'', hasHighBP:'', bpMedication:'', hasHeartDisease:'', hasDiabetes:'', diabetesMedication:'', knowsBP:'unknown', systolic:'', diastolic:'', knowsGlucose:'unknown', glucose:'', smokingStatus:'', cigarettesPerDay:'', alcoholConsumption:'', diet:'', physicalActivity:'', sleepStress:'' });
  };

  const handleViewFullReport = () => { if (!reportData) generateReport(); setShowFullReport(true); };
  
  const handleDownloadReport = () => {
    if (!reportData) return;
    const txt = `STROKE RISK ASSESSMENT REPORT\nGenerated: ${reportData.generated}\n\nRisk Level: ${reportData.risk.level} (${reportData.risk.score}%)\n\n${reportData.disclaimer}`;
    const a = Object.assign(document.createElement('a'), { 
      href: URL.createObjectURL(new Blob([txt], { type: 'text/plain' })), 
      download: `stroke-report-${new Date().toISOString().split('T')[0]}.txt` 
    });
    a.click(); 
    URL.revokeObjectURL(a.href);
  };

  // ─── Render helpers ───────────────────────────────────────────────────────────
  const currentSectionData  = sections[currentSection - 1];
  const currentQuestionData = currentSectionData?.questions[currentStep - 1];

  const renderQuestion = (question) => {
    if (!question) return null;
    switch (question.type) {
      case 'slider': {
        let val = formData[question.id];
        if (!val || isNaN(val) || val < question.min || val > question.max) val = question.id === 'age' ? 35 : question.min;
        const pct = ((val - question.min) / (question.max - question.min)) * 100;
        return (
          <div className="sd-slider-container">
            <div className="sd-slider-value">
              <span className="sd-slider-number">{val}</span>
              <span className="sd-slider-unit">{question.unit}</span>
            </div>
            <input 
              type="range" 
              min={question.min} 
              max={question.max} 
              value={val}
              style={{ background: `linear-gradient(90deg, var(--primary) ${pct}%, var(--gray-200) ${pct}%)` }}
              onChange={e => handleInputChange(question.id, parseInt(e.target.value))}
              className="sd-slider" 
            />
            <div className="sd-slider-labels"><span>{question.min}</span><span>{question.max}</span></div>
          </div>
        );
      }
      case 'dual-slider': {
        const h = formData.height || 170;
        const w = formData.weight || 70;
        const hPct = ((h - question.heightMin) / (question.heightMax - question.heightMin)) * 100;
        const wPct = ((w - question.weightMin) / (question.weightMax - question.weightMin)) * 100;
        const bmi = calculateBMI();
        
        return (
          <div className="sd-dual-slider-compact">
            <div className="sd-bmi-indicator-compact">
              <span className="sd-bmi-label-compact">Your BMI</span>
              <span className="sd-bmi-value-compact">{bmi}</span>
            </div>
            
            <div className="sd-sliders-row">
              <div className="sd-slider-group-compact">
                <label>Height</label>
                <div className="sd-slider-value-compact">{h} cm</div>
                <input 
                  type="range" 
                  min={question.heightMin} 
                  max={question.heightMax} 
                  value={h}
                  style={{ background: `linear-gradient(90deg, var(--primary) ${hPct}%, var(--gray-200) ${hPct}%)` }}
                  onChange={e => handleInputChange('height', parseInt(e.target.value))} 
                  className="sd-slider-compact" 
                />
                <div className="sd-slider-labels-compact">
                  <span>{question.heightMin}</span>
                  <span>{question.heightMax}</span>
                </div>
              </div>
              
              <div className="sd-slider-group-compact">
                <label>Weight</label>
                <div className="sd-slider-value-compact">{w} kg</div>
                <input 
                  type="range" 
                  min={question.weightMin} 
                  max={question.weightMax} 
                  value={w}
                  style={{ background: `linear-gradient(90deg, var(--primary) ${wPct}%, var(--gray-200) ${wPct}%)` }}
                  onChange={e => handleInputChange('weight', parseInt(e.target.value))} 
                  className="sd-slider-compact" 
                />
                <div className="sd-slider-labels-compact">
                  <span>{question.weightMin}</span>
                  <span>{question.weightMax}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'yes-no':
        return (
          <div className="sd-options-grid sd-options-two">
            {['Yes', 'No'].map(opt => (
              <button 
                key={opt} 
                className={`sd-option-btn ${formData[question.id] === opt ? 'sd-selected' : ''}`}
                onClick={() => handleInputChange(question.id, opt)}
              >
                {opt} {formData[question.id] === opt && <FaCheck />}
              </button>
            ))}
          </div>
        );
      case 'options':
        return (
          <div className="sd-options-grid">
            {question.options.map(opt => (
              <button 
                key={opt} 
                className={`sd-option-btn ${formData[question.id] === opt ? 'sd-selected' : ''}`}
                onClick={() => handleInputChange(question.id, opt)}
              >
                {opt} {formData[question.id] === opt && <FaCheck />}
              </button>
            ))}
          </div>
        );
      case 'smoking':
        return (
          <>
            <div className="sd-options-grid">
              {question.options.map(opt => (
                <button 
                  key={opt} 
                  className={`sd-option-btn ${formData.smokingStatus === opt ? 'sd-selected' : ''}`}
                  onClick={() => handleInputChange('smokingStatus', opt)}
                >
                  {opt} {formData.smokingStatus === opt && <FaCheck />}
                </button>
              ))}
            </div>
            {showCigarettes && (
              <div className="sd-conditional-section">
                <label className="sd-conditional-label">How many cigarettes per day?</label>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <input 
                    type="number" 
                    min="1" 
                    max="100" 
                    value={formData.cigarettesPerDay}
                    onChange={e => handleInputChange('cigarettesPerDay', e.target.value)}
                    placeholder="e.g. 10" 
                    className="sd-number-input" 
                  />
                </div>
              </div>
            )}
          </>
        );
      case 'bp-input':
        return (
          <>
            <div className="sd-options-grid sd-options-two">
              {["I don't know", "I know it"].map(opt => (
                <button 
                  key={opt} 
                  className={`sd-option-btn ${formData.knowsBP === opt ? 'sd-selected' : ''}`}
                  onClick={() => handleInputChange('knowsBP', opt)}
                >
                  {opt} {formData.knowsBP === opt && <FaCheck />}
                </button>
              ))}
            </div>
            {showBpInputs && (
              <div className="sd-bp-inputs">
                <div className="sd-bp-field">
                  <label>Systolic</label>
                  <input 
                    type="number" 
                    placeholder="120" 
                    value={formData.systolic}
                    onChange={e => handleInputChange('systolic', e.target.value)} 
                    className="sd-number-input" 
                  />
                  <span className="sd-bp-unit">mmHg</span>
                </div>
                <div className="sd-bp-field">
                  <label>Diastolic</label>
                  <input 
                    type="number" 
                    placeholder="80" 
                    value={formData.diastolic}
                    onChange={e => handleInputChange('diastolic', e.target.value)} 
                    className="sd-number-input" 
                  />
                  <span className="sd-bp-unit">mmHg</span>
                </div>
              </div>
            )}
          </>
        );
      case 'glucose-input':
  return (
    <>
      <div className="sd-options-grid sd-options-two">
        {["I don't know", "I know it"].map(opt => (
          <button 
            key={opt} 
            className={`sd-option-btn ${formData.knowsGlucose === opt ? 'sd-selected' : ''}`}
            onClick={() => handleGlucoseSelection(opt)}
          >
            {opt} {formData.knowsGlucose === opt && <FaCheck />}
          </button>
        ))}
      </div>
      
      {/* Show glucose input if user knows their levels */}
      {showGlucoseInput && (
        <div className="sd-glucose-input">
          <input 
            type="number" 
            placeholder="e.g. 100" 
            value={formData.glucose}
            onChange={e => handleInputChange('glucose', e.target.value)} 
            className="sd-number-input" 
          />
          <span className="sd-glucose-unit">mg/dL</span>
        </div>
      )}
      
      {/* Show follow-up questions if user doesn't know their levels */}
      {showGlucoseFollowUp && (
        <div className="sd-glucose-followup">
          {/* Question 1: Excessive thirst */}
          <div className="sd-followup-question">
            <label className="sd-followup-label">
              How often do you experience excessive thirst or frequent urination?
            </label>
            <div className="sd-options-grid">
              {['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'].map(option => (
                <button
                  key={option}
                  className={`sd-option-btn ${formData.excessiveThirst === option ? 'sd-selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, excessiveThirst: option }))}
                >
                  {option} {formData.excessiveThirst === option && <FaCheck />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Fatigue */}
          <div className="sd-followup-question">
            <label className="sd-followup-label">
              Do you often feel tired or fatigued even after adequate rest?
            </label>
            <div className="sd-options-grid">
              {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].map(option => (
                <button
                  key={option}
                  className={`sd-option-btn ${formData.frequentFatigue === option ? 'sd-selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, frequentFatigue: option }))}
                >
                  {option} {formData.frequentFatigue === option && <FaCheck />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Blurred vision */}
          <div className="sd-followup-question">
            <label className="sd-followup-label">
              Have you noticed any blurred vision recently?
            </label>
            <div className="sd-options-grid">
              {['Never', 'Rarely', 'Sometimes', 'Often', 'Constant'].map(option => (
                <button
                  key={option}
                  className={`sd-option-btn ${formData.blurredVision === option ? 'sd-selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, blurredVision: option }))}
                >
                  {option} {formData.blurredVision === option && <FaCheck />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Sugar intake */}
          <div className="sd-followup-question">
            <label className="sd-followup-label">
              How would you describe your typical daily sugar intake?
            </label>
            <div className="sd-options-grid">
              {['Very low', 'Low', 'Moderate', 'High', 'Very high'].map(option => (
                <button
                  key={option}
                  className={`sd-option-btn ${formData.sugarIntake === option ? 'sd-selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, sugarIntake: option }))}
                >
                  {option} {formData.sugarIntake === option && <FaCheck />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
      default: return null;
    }
  };

  const renderConditionalField = () => {
    if (!currentQuestionData?.conditional) return null;
    const isVisible = (currentQuestionData.id === 'hasHighBP' && showBpMedication) ||
                      (currentQuestionData.id === 'hasDiabetes' && showDiabetesMedication);
    if (!isVisible) return null;
    const { conditionField, conditionLabel } = currentQuestionData;
    return (
      <div className="sd-conditional-section">
        <label className="sd-conditional-label">{conditionLabel}</label>
        <div className="sd-options-grid sd-options-two">
          {['Yes', 'No'].map(opt => (
            <button 
              key={opt} 
              className={`sd-option-btn ${formData[conditionField] === opt ? 'sd-selected' : ''}`}
              onClick={() => handleInputChange(conditionField, opt)}
            >
              {opt} {formData[conditionField] === opt && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
    );
  };

// ═══════════════════════════════════════════════════════════════════════════
//  FULL REPORT VIEW - Updated with Stroke Risk Assessment title
// ═══════════════════════════════════════════════════════════════════════════
if (showFullReport && reportData) {
  const { risk, patientInfo, vitalSigns, recommendations, disclaimer, generated } = reportData;
  const glucoseNum = parseInt(vitalSigns.glucose);
  const glucoseStatus = vitalSigns.glucose !== 'Not provided'
    ? (glucoseNum > 125 ? { label: 'High', color: '#EF4444' } : glucoseNum > 100 ? { label: 'Borderline', color: '#F59E0B' } : { label: 'Normal', color: '#10B981' })
    : { label: 'Not measured', color: '#9CA3AF' };
  const bpStatusColor = vitalSigns.bpStatus === 'Normal' ? '#10B981' : vitalSigns.bpStatus === 'Borderline' ? '#F59E0B' : '#EF4444';
  
  return (
    <div className="sd-container">
      <div className="sd-bg-blob sd-blob-1" /><div className="sd-bg-blob sd-blob-2" />
      <div className="sd-report-page">
        <div className="sd-report-page-inner">
          <div className="sd-report-card">
            <div className="sd-report-brand">
              <div className="sd-report-brand-left">
                {/* Small Stroke Risk Assessment text above the date */}
                <div className="sd-report-small-title">Stroke Risk Assessment</div>
                <div className="sd-report-date-badge">Generated: {generated}</div>
              </div>
              {/* Download button inside card where date used to be */}
              <button className="sd-report-download-box" onClick={handleDownloadReport}>
                <FaDownload /> Download Report
              </button>
            </div>
            <div className="sd-report-hero">
              <div className="sd-report-hero-icon"><FaFileAlt /></div>
              <h1 className="sd-report-title">Comprehensive Health Assessment Report</h1>
              <p className="sd-report-subtitle">Stroke Risk Evaluation and Personalized Recommendations</p>
            </div>
            <div className="sd-report-section">
              <h2 className="sd-section-heading">Risk Summary</h2>
              <div className="sd-risk-summary-card" style={{ borderLeftColor: risk.color }}>
                <div className="sd-risk-summary-header">
                  <div>
                    <span className="sd-risk-level-label">Overall Stroke Risk</span>
                    <span className="sd-risk-level-value" style={{ color: risk.color }}>{risk.level}</span>
                  </div>
                  <span className="sd-risk-score" style={{ color: risk.color }}>{risk.score}%</span>
                </div>
                <div className="sd-risk-meter-large">
                  <div className="sd-risk-bar-large"><div className="sd-risk-progress-large" style={{ width: `${risk.score}%`, background: risk.color }} /></div>
                  <div className="sd-risk-scale">{['0%','25%','50%','75%','100%'].map(l => <span key={l}>{l}</span>)}</div>
                </div>
                <p className="sd-risk-description">{risk.description}</p>
                <div className="sd-ten-year-risk">
                  <span className="sd-ten-year-label">Estimated 10-Year Stroke Risk</span>
                  <span className="sd-ten-year-value" style={{ color: risk.color }}>{risk.tenYearRisk}%</span>
                </div>
              </div>
            </div>
            <div className="sd-report-grid">
              <div>
                <h2 className="sd-section-heading">Patient Information</h2>
                <div className="sd-info-grid">
                  {[
                    {label:'Age', value:`${patientInfo.age} years`},
                    {label:'Sex', value:patientInfo.sex},
                    {label:'Ethnicity', value:patientInfo.ethnicity},
                    {label:'Marital Status', value:patientInfo.maritalStatus},
                    {label:'Height', value:`${patientInfo.height} cm`},
                    {label:'Weight', value:`${patientInfo.weight} kg`}
                  ].map(({label,value}) => (
                    <div key={label} className="sd-info-item">
                      <span className="sd-info-label">{label}</span>
                      <span className="sd-info-value">{value}</span>
                    </div>
                  ))}
                  <div className="sd-info-item">
                    <span className="sd-info-label">BMI</span>
                    <span className="sd-info-value" style={{ color: patientInfo.bmiColor }}>
                      {patientInfo.bmi} — {patientInfo.bmiCategory}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="sd-section-heading">Vital Signs</h2>
                <div className="sd-vitals-grid" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="sd-vital-card">
                    <div className="sd-vital-icon-wrap" style={{ color: '#E63E4E' }}><FaHeartbeat /></div>
                    <div>
                      <div className="sd-vital-label">Blood Pressure</div>
                      <div className="sd-vital-value">{vitalSigns.bloodPressure}</div>
                      <span className="sd-vital-status" style={{ color: bpStatusColor, background: `${bpStatusColor}18` }}>
                        {vitalSigns.bpStatus}
                      </span>
                    </div>
                  </div>
                  <div className="sd-vital-card">
                    <div className="sd-vital-icon-wrap" style={{ color: '#10B981' }}><FaTint /></div>
                    <div>
                      <div className="sd-vital-label">Blood Glucose</div>
                      <div className="sd-vital-value">
                        {vitalSigns.glucose}{vitalSigns.glucose !== 'Not provided' ? ' mg/dL' : ''}
                      </div>
                      <span className="sd-vital-status" style={{ color: glucoseStatus.color, background: `${glucoseStatus.color}18` }}>
                        {glucoseStatus.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sd-report-section">
              <h2 className="sd-section-heading">Identified Risk Factors</h2>
              <div className="sd-risk-factors-list">
                {risk.factors.map((f, i) => {
                  const fc = f.impact === 'high' ? '#EF4444' : f.impact === 'moderate' ? '#F59E0B' : '#10B981';
                  return (
                    <div key={i} className="sd-risk-factor-item">
                      <div className="sd-risk-factor-header">
                        <span className="sd-risk-factor-name">{f.factor}</span>
                        <span className={`sd-risk-factor-impact sd-${f.impact}`}>
                          {f.impact} +{f.points} pts
                        </span>
                      </div>
                      <div className="sd-risk-factor-bar">
                        <div className="sd-risk-factor-progress" style={{ width: `${Math.min((f.points/25)*100,100)}%`, background: fc }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sd-report-section">
              <h2 className="sd-section-heading">Personalized Recommendations</h2>
              <div className="sd-recommendations-grid">
                {recommendations.map((rec, i) => (
                  <div key={i} className="sd-recommendation-card">
                    <div className="sd-recommendation-header" style={{ color: rec.color }}>
                      {rec.icon} <h3 style={{ margin:0, fontSize:'1rem' }}>{rec.category}</h3>
                    </div>
                    <ul className="sd-recommendation-list">
                      {rec.items.map((item,j) => (
                        <li key={j}>
                          <FaCheck className="sd-recommendation-check" style={{ color: rec.color, flexShrink:0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="sd-report-section">
              <h2 className="sd-section-heading">Stroke Warning Signs — FAST</h2>
              <div className="sd-fast-grid">
                {[
                  {l:'F', title:'Face Drooping', desc:'Does one side of the face droop or feel numb? Ask the person to smile.'},
                  {l:'A', title:'Arm Weakness', desc:'Is one arm weak or numb? Ask the person to raise both arms.'},
                  {l:'S', title:'Speech Difficulty', desc:'Is speech slurred or strange? Ask them to repeat a simple sentence.'},
                  {l:'T', title:'Time to Call Emergency', desc:'If any of these symptoms appear, call emergency services immediately.'}
                ].map(({l,title,desc}) => (
                  <div key={l} className="sd-fast-card">
                    <div className="sd-fast-letter">{l}</div>
                    <div className="sd-fast-content">
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sd-report-disclaimer">
              <FaExclamationTriangle className="sd-report-disclaimer-icon" />
              <p>{disclaimer}</p>
            </div>
            <div className="sd-report-footer">
              <button className="sd-btn-primary" onClick={() => setShowFullReport(false)}>
                <FaArrowLeft /> Back to Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  // ═══════════════════════════════════════════════════════════════════════════
  //  RESULTS VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (showResults) {
    const rd = reportData || generateReport();
    const { risk } = rd;
    const topFactors = risk.factors.slice(0, 5);
    const bmi = calculateBMI();
    const bmiNum = parseFloat(bmi);
    const bmiColor = bmiNum < 18.5 ? '#F59E0B' : bmiNum < 25 ? '#10B981' : bmiNum < 30 ? '#F59E0B' : '#EF4444';
    
    return (
      <div className="sd-container">
        <div className="sd-bg-blob sd-blob-1" /><div className="sd-bg-blob sd-blob-2" />
        <div className="sd-results-wrapper">
          <div className="sd-results-layout">
            <div className="sd-results-hero">
              <div className="sd-results-icon"><FaHeartbeat /></div>
              <h1 className="sd-results-title">Analysis Complete</h1>
              <p className="sd-results-subtitle">Your stroke risk profile has been assessed based on your responses.</p>
              <div className="sd-risk-meter">
                <div className="sd-risk-label">
                  <span>Stroke Risk Level</span>
                  <span className="sd-risk-value" style={{ color: risk.color, background: `${risk.color}15` }}>
                    {risk.level}
                  </span>
                </div>
                <div className="sd-risk-bar">
                  <div className="sd-risk-progress" style={{ width: `${risk.score}%`, background: risk.color }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', color:'var(--gray-400)', marginTop:'0.4rem' }}>
                  <span>Low</span><span>Moderate</span><span>High</span>
                </div>
              </div>
              <div className="sd-risk-summary-box">
                <p style={{ margin:0 }}>{risk.description}</p>
              </div>
              <div className="sd-results-actions">
                <button className="sd-btn-primary" onClick={handleReset}>New Assessment</button>
                <button className="sd-btn-secondary" onClick={handleViewFullReport}>
                  <FaFileAlt /> View Full Report
                </button>
              </div>
            </div>
            <div className="sd-results-stats">
              <div className="sd-stat-card">
                <div className="sd-stat-header">
                  <div className="sd-stat-icon" style={{ background:`${risk.color}15`, color:risk.color }}><FaShieldAlt /></div>
                  <span className="sd-stat-label">Risk Score</span>
                </div>
                <div className="sd-stat-value" style={{ color: risk.color }}>{risk.score}%</div>
                <div className="sd-stat-sub">10-year stroke risk estimate: {risk.tenYearRisk}%</div>
              </div>
              <div className="sd-stat-card">
                <div className="sd-stat-header">
                  <div className="sd-stat-icon" style={{ background:`${bmiColor}15`, color:bmiColor }}><FaWeight /></div>
                  <span className="sd-stat-label">Body Mass Index</span>
                </div>
                <div className="sd-stat-value" style={{ color: bmiColor }}>{bmi}</div>
                <div className="sd-stat-sub">
                  {bmiNum < 18.5 ? 'Underweight' : bmiNum < 25 ? 'Healthy weight' : bmiNum < 30 ? 'Overweight' : 'Obese'} — {formData.height} cm / {formData.weight} kg
                </div>
              </div>
              <div className="sd-stat-card">
                <div className="sd-stat-header">
                  <div className="sd-stat-icon" style={{ background:'rgba(230,62,78,0.1)', color:'var(--primary)' }}><FaHeartbeat /></div>
                  <span className="sd-stat-label">Blood Pressure</span>
                </div>
                <div className="sd-stat-value" style={{ fontSize: formData.systolic ? '1.8rem' : '1.1rem', color:'var(--gray-700)' }}>
                  {formData.systolic && formData.diastolic ? `${formData.systolic}/${formData.diastolic}` : 'Not provided'}
                </div>
                {formData.systolic && <div className="sd-stat-sub">mmHg — {rd.vitalSigns.bpStatus}</div>}
              </div>
              {topFactors.length > 0 && (
                <div className="sd-factors-preview">
                  <div className="sd-factors-preview-title">Top Risk Factors Identified</div>
                  {topFactors.map((f, i) => { 
                    const fc = f.impact==='high'?'#EF4444':f.impact==='moderate'?'#F59E0B':'#10B981'; 
                    return (
                      <div key={i} className="sd-factor-mini-item">
                        <span className="sd-factor-mini-name">{f.factor}</span>
                        <span className="sd-factor-mini-badge" style={{ color:fc, background:`${fc}15` }}>
                          {f.impact}
                        </span>
                      </div>
                    );
                  })}
                  {risk.factors.length > 5 && (
                    <div style={{ fontSize:'0.82rem', color:'var(--gray-400)', paddingTop:'0.6rem', textAlign:'center' }}>
                      +{risk.factors.length-5} more in full report
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  MAIN FORM VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  const isFirstStep = currentSection === 1 && currentStep === 1;
  const isLastStep  = currentSection === sections.length && currentStep === currentSectionData?.questions.length;

  return (
    <div className="sd-container">
      <div className="sd-bg-blob sd-blob-1" />
      <div className="sd-bg-blob sd-blob-2" />

      {/* Fixed header — section pill + title */}
      <div className="sd-header">
        <div className="sd-header-content">
          <div className="sd-section-info">
            <span className="sd-section-pill">Section {currentSection}/3</span>
            <span className="sd-section-title">{currentSectionData?.title}</span>
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="sd-question-wrapper">
        <div className="sd-question-outer">
          <div className="sd-question-card">

            {/* Colour top stripe */}
            <div className="sd-section-badge" style={{ background: currentSectionData?.color }} />

            {/* Floating section pill with proper border */}
            <div 
              className="sd-section-badge-pill" 
              style={{ 
                color: currentSectionData?.color, 
                borderColor: currentSectionData?.color + ' !important' 
              }}
            >
              {currentSectionData?.icon}
              <span>{currentSectionData?.title}</span>
            </div>

            {/* In-card progress bar - showing percentage */}
            <div className="sd-card-progress">
              <div className="sd-card-progress-header">
                <span className="sd-card-progress-label">Question {currentQuestion} of {totalQuestions}</span>
                <span className="sd-card-progress-pct">{cardProgressPct}% Complete</span>
              </div>
              <div className="sd-card-progress-track">
                <div className="sd-card-progress-fill" style={{ width: `${cardProgressPct}%` }} />
              </div>
            </div>

            {/* Question body */}
            <div className="sd-question-body">
              <div className="sd-icon-wrapper">
                <div className="sd-question-icon" style={{ background: `${currentSectionData?.color}12`, color: currentSectionData?.color }}>
                  {currentQuestionData?.icon}
                </div>
              </div>
              <h2 className="sd-question-text">{currentQuestionData?.label}</h2>
              <div className="sd-question-input-area">
                {renderQuestion(currentQuestionData)}
                {renderConditionalField()}
              </div>
            </div>

            {/* Navigation */}
            <div className="sd-navigation">
              <button 
                className={`sd-nav-btn sd-back ${isFirstStep ? 'sd-disabled' : ''}`} 
                onClick={goToPrevious} 
                disabled={isFirstStep}
              >
                <FaArrowLeft /> Back
              </button>
              <div className="sd-step-indicator">
                {currentSectionData?.questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`sd-step-dot ${i+1===currentStep?'sd-active':''} ${i+1<currentStep?'sd-completed':''}`} 
                  />
                ))}
              </div>
              <button className="sd-nav-btn sd-next" onClick={goToNext} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : isLastStep ? 'Submit' : 'Next'}
                {!isSubmitting && <FaArrowRight />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {isSubmitting && (
        <div className="sd-loading-overlay">
          <div className="sd-loading-card">
            <div className="sd-spinner-large" />
            <h3 className="sd-loading-title">Analyzing Your Health Profile</h3>
            <p className="sd-loading-subtitle">Our AI is processing your responses...</p>
            <div className="sd-loading-dots"><span /><span /><span /></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomDetector;