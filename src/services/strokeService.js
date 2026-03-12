// src/services/strokeService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-auth-token'] = token;
    }
    console.log('🚀 StrokeService Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ StrokeService Response:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ StrokeService Response error:', error.response || error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* ========== CAMBODIA QUESTIONNAIRE SCORING SYSTEM ========== */
const calculateCambodiaQuestionnaireScore = (formData) => {
  console.log('🔍 === QUESTIONNAIRE CALCULATION DEBUG START ===');

  let questionnaireScore = 0;
  let maxPossibleScore = 0;

  const riskWeights = {
    alcoholConsumption: {
      'Never': 0,
      'Occasionally (e.g., social events)': 10,
      'Regularly (1–2 times/week)': 25,
      'Frequently (3+ times/week)': 40
    },
    diet: {
      'Balanced (fruits, vegetables, lean protein)': 0,
      'High in salty foods (e.g., prahok, processed foods)': 30,
      'High in fatty foods (e.g., fried foods, fatty meats)': 25,
      'High in sugary foods & drinks': 35
    },
    physicalActivity: {
      'Sedentary (little to no exercise)': 30,
      'Light (1-2 times/week)': 15,
      'Moderate (3-4 times/week)': 5,
      'Active (5+ times/week)': 0
    },
    familyStroke: {
      'No': 0,
      'Yes': 25
    },
    familyHeart: {
      'No': 0,
      'Yes': 20
    },
    familyDiabetes: {
      'No': 0,
      'Yes': 15
    }
  };

  // Medication weights
  const hypertensionMeds = {
    'No': 25,
    'Yes': 5
  };

  const diabetesMeds = {
    'No': 20,
    'Yes': 5
  };

  console.log('📊 Checking questionnaire data fields:');

  // Check alcohol consumption
  if (formData.alcoholConsumption && riskWeights.alcoholConsumption[formData.alcoholConsumption] !== undefined) {
    const score = riskWeights.alcoholConsumption[formData.alcoholConsumption];
    const maxForCategory = Math.max(...Object.values(riskWeights.alcoholConsumption));
    console.log(`   ✅ alcoholConsumption: "${formData.alcoholConsumption}" → Score: ${score}, Max: ${maxForCategory}`);
    questionnaireScore += score;
    maxPossibleScore += maxForCategory;
  } else {
    console.log(`   ❌ alcoholConsumption: MISSING or INVALID data`);
    maxPossibleScore += Math.max(...Object.values(riskWeights.alcoholConsumption));
  }

  // Check diet
  if (formData.diet && riskWeights.diet[formData.diet] !== undefined) {
    const score = riskWeights.diet[formData.diet];
    const maxForCategory = Math.max(...Object.values(riskWeights.diet));
    console.log(`   ✅ diet: "${formData.diet}" → Score: ${score}, Max: ${maxForCategory}`);
    questionnaireScore += score;
    maxPossibleScore += maxForCategory;
  } else {
    console.log(`   ❌ diet: MISSING or INVALID data`);
    maxPossibleScore += Math.max(...Object.values(riskWeights.diet));
  }

  // Check physical activity
  if (formData.physicalActivity && riskWeights.physicalActivity[formData.physicalActivity] !== undefined) {
    const score = riskWeights.physicalActivity[formData.physicalActivity];
    const maxForCategory = Math.max(...Object.values(riskWeights.physicalActivity));
    console.log(`   ✅ physicalActivity: "${formData.physicalActivity}" → Score: ${score}, Max: ${maxForCategory}`);
    questionnaireScore += score;
    maxPossibleScore += maxForCategory;
  } else {
    console.log(`   ❌ physicalActivity: MISSING or INVALID data`);
    maxPossibleScore += Math.max(...Object.values(riskWeights.physicalActivity));
  }

  // Check family stroke
  if (formData.familyStroke && riskWeights.familyStroke[formData.familyStroke] !== undefined) {
    const score = riskWeights.familyStroke[formData.familyStroke];
    const maxForCategory = Math.max(...Object.values(riskWeights.familyStroke));
    console.log(`   ✅ familyStroke: "${formData.familyStroke}" → Score: ${score}, Max: ${maxForCategory}`);
    questionnaireScore += score;
    maxPossibleScore += maxForCategory;
  } else {
    console.log(`   ❌ familyStroke: MISSING or INVALID data`);
    maxPossibleScore += Math.max(...Object.values(riskWeights.familyStroke));
  }

  // Check family heart
  if (formData.familyHeart && riskWeights.familyHeart[formData.familyHeart] !== undefined) {
    const score = riskWeights.familyHeart[formData.familyHeart];
    const maxForCategory = Math.max(...Object.values(riskWeights.familyHeart));
    console.log(`   ✅ familyHeart: "${formData.familyHeart}" → Score: ${score}, Max: ${maxForCategory}`);
    questionnaireScore += score;
    maxPossibleScore += maxForCategory;
  } else {
    console.log(`   ❌ familyHeart: MISSING or INVALID data`);
    maxPossibleScore += Math.max(...Object.values(riskWeights.familyHeart));
  }

  // Check family diabetes
  if (formData.familyDiabetes && riskWeights.familyDiabetes[formData.familyDiabetes] !== undefined) {
    const score = riskWeights.familyDiabetes[formData.familyDiabetes];
    const maxForCategory = Math.max(...Object.values(riskWeights.familyDiabetes));
    console.log(`   ✅ familyDiabetes: "${formData.familyDiabetes}" → Score: ${score}, Max: ${maxForCategory}`);
    questionnaireScore += score;
    maxPossibleScore += maxForCategory;
  } else {
    console.log(`   ❌ familyDiabetes: MISSING or INVALID data`);
    maxPossibleScore += Math.max(...Object.values(riskWeights.familyDiabetes));
  }

  // Check hypertension medication
  if (formData.hasHighBP === 'Yes') {
    if (formData.bpMedication && hypertensionMeds[formData.bpMedication] !== undefined) {
      const score = hypertensionMeds[formData.bpMedication];
      const maxForCategory = Math.max(...Object.values(hypertensionMeds));
      console.log(`   ✅ bpMedication: "${formData.bpMedication}" → Score: ${score}, Max: ${maxForCategory}`);
      questionnaireScore += score;
      maxPossibleScore += maxForCategory;
    } else {
      console.log(`   ❌ bpMedication: MISSING or INVALID data`);
      maxPossibleScore += Math.max(...Object.values(hypertensionMeds));
    }
  } else {
    maxPossibleScore += Math.max(...Object.values(hypertensionMeds));
  }

  // Check diabetes medication
  if (formData.hasDiabetes === 'Yes') {
    if (formData.diabetesMedication && diabetesMeds[formData.diabetesMedication] !== undefined) {
      const score = diabetesMeds[formData.diabetesMedication];
      const maxForCategory = Math.max(...Object.values(diabetesMeds));
      console.log(`   ✅ diabetesMedication: "${formData.diabetesMedication}" → Score: ${score}, Max: ${maxForCategory}`);
      questionnaireScore += score;
      maxPossibleScore += maxForCategory;
    } else {
      console.log(`   ❌ diabetesMedication: MISSING or INVALID data`);
      maxPossibleScore += Math.max(...Object.values(diabetesMeds));
    }
  } else {
    maxPossibleScore += Math.max(...Object.values(diabetesMeds));
  }

  console.log(`📈 Questionnaire Score: ${questionnaireScore}`);
  console.log(`📈 Max Possible Score: ${maxPossibleScore}`);

  const questionnairePercentage = maxPossibleScore > 0 
    ? (questionnaireScore / maxPossibleScore) * 100 
    : 0;

  console.log(`🎯 Final Questionnaire Percentage: ${questionnairePercentage.toFixed(2)}%`);
  console.log('🔍 === QUESTIONNAIRE CALCULATION DEBUG END ===');

  return Math.min(questionnairePercentage, 100);
};

/* ========== GLUCOSE LEVEL PREDICTION ========== */
const predictGlucoseLevel = (formData) => {
  console.log('🔮 Predicting glucose level from symptoms');
  let predictedGlucose = 95; // Base value

  // Thirst/urination frequency
  if (formData.excessiveThirst === 'Very often') predictedGlucose += 25;
  else if (formData.excessiveThirst === 'Often') predictedGlucose += 20;
  else if (formData.excessiveThirst === 'Sometimes') predictedGlucose += 15;

  // Fatigue
  if (formData.frequentFatigue === 'Always') predictedGlucose += 20;
  else if (formData.frequentFatigue === 'Often') predictedGlucose += 15;
  else if (formData.frequentFatigue === 'Sometimes') predictedGlucose += 10;

  // Blurred vision
  if (formData.blurredVision === 'Constant') predictedGlucose += 20;
  else if (formData.blurredVision === 'Often') predictedGlucose += 15;
  else if (formData.blurredVision === 'Sometimes') predictedGlucose += 10;

  // Sugar intake
  if (formData.sugarIntake === 'Very high') predictedGlucose += 30;
  else if (formData.sugarIntake === 'High') predictedGlucose += 20;
  else if (formData.sugarIntake === 'Moderate') predictedGlucose += 15;

  // Family diabetes
  if (formData.familyDiabetes === 'Yes') predictedGlucose += 20;

  // Existing diabetes
  if (formData.hasDiabetes === 'Yes') {
    if (formData.diabetesMedication === 'No') predictedGlucose += 50;
    else if (formData.diabetesMedication === 'Yes') predictedGlucose += 25;
  }

  const finalGlucose = Math.max(50, Math.min(300, Math.round(predictedGlucose)));
  console.log(`🔮 Predicted Glucose Level: ${finalGlucose} mg/dL`);
  
  return finalGlucose;
};

/* ========== HYBRID RISK CALCULATION ========== */
const calculateHybridRisk = (mlProbability, questionnairePercentage) => {
  console.log('🧮 === HYBRID RISK CALCULATION DEBUG ===');

  const mlPercentage = mlProbability * 100;

  // Add questionnaire score as a bonus to ML result (70% of questionnaire score)
  const questionnaireBonus = questionnairePercentage * 0.7;
  const finalScore = mlPercentage + questionnaireBonus;

  console.log(`   ML Probability: ${mlProbability}`);
  console.log(`   ML Percentage: ${mlPercentage.toFixed(2)}%`);
  console.log(`   Questionnaire Percentage: ${questionnairePercentage.toFixed(2)}%`);
  console.log(`   Questionnaire Bonus (70%): ${questionnaireBonus.toFixed(2)}%`);
  console.log(`   Raw Total: ${finalScore.toFixed(2)}%`);
  console.log(`   Final Score (capped): ${Math.min(finalScore, 99.99).toFixed(2)}%`);

  console.log('🧮 === HYBRID RISK CALCULATION DEBUG END ===');

  // Cap at 99.99% maximum
  return Math.min(finalScore, 99.99);
};

/* ========== MAP FORM DATA TO BACKEND FORMAT ========== */
const mapFormToBackend = (formData) => {
  console.log('🔄 Mapping form data to backend format');

  // Handle glucose level
  let glucoseLevel = 0;
  
  if (formData.knowsGlucose === 'I know it' && formData.glucose) {
    glucoseLevel = parseFloat(formData.glucose) || 0;
    console.log(`📊 Using provided glucose: ${glucoseLevel} mg/dL`);
  } else if (formData.knowsGlucose === "I don't know") {
    glucoseLevel = predictGlucoseLevel(formData);
    console.log(`📊 Using predicted glucose: ${glucoseLevel} mg/dL`);
  }

  // Calculate BMI if not provided directly
  const bmi = calculateBMI(formData.height, formData.weight);

  return {
    sex: formData.sex === 'Male' ? 1 : 0,
    age: parseInt(formData.age) || 0,
    hypertension: formData.hasHighBP === 'Yes' ? 1 : 0,
    heart_disease: formData.hasHeartDisease === 'Yes' ? 1 : 0,
    ever_married: formData.maritalStatus === 'Married' ? 1 : 0,
    Residence_type: formData.residenceType === 'Urban' ? 1 : 0,
    avg_glucose_level: glucoseLevel,
    bmi: parseFloat(bmi) || 22,
    smoking_status: formData.smokingStatus === 'Smokes' ? 1 : 0,
    work_Govt_job: formData.workType === 'Government job' ? 1 : 0,
    work_Never_worked: formData.workType === 'Never worked' ? 1 : 0,
    work_Private: formData.workType === 'Private' ? 1 : 0,
    "work_Self-employed": formData.workType === 'Self-employed' ? 1 : 0,
    work_children: formData.workType === 'Children' ? 1 : 0
  };
};

/* ========== BMI CALCULATION ========== */
const calculateBMI = (height, weight) => {
  if (height && weight && height > 0 && weight > 0) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
  return '22.0'; // Default BMI
};

/* ========== MAIN PREDICTION FUNCTION ========== */
export const predictStrokeRisk = async (formData) => {
  console.log('🚀 === COMPREHENSIVE PREDICTION START ===');
  console.log('📋 Raw Form Data:', formData);

  try {
    // Step 1: Calculate questionnaire score
    const questionnairePercentage = calculateCambodiaQuestionnaireScore(formData);
    
    // Step 2: Map data to backend format
    const mappedData = mapFormToBackend(formData);
    
    // Step 3: Prepare feature order for ML API
    const feature_order = [
      "sex", "age", "hypertension", "heart_disease", "ever_married",
      "Residence_type", "avg_glucose_level", "bmi", "smoking_status",
      "work_Govt_job", "work_Never_worked", "work_Private",
      "work_Self-employed", "work_children"
    ];

    const orderedData = {};
    feature_order.forEach(key => {
      orderedData[key] = mappedData[key] !== undefined ? mappedData[key] : 0;
    });

    console.log('📤 Data being sent to ML API:', orderedData);

    // Step 4: Send to backend
    const response = await api.post('/symptoms/detect', orderedData);
    const mlResult = response.data;
    
    console.log('🤖 ML API Response:', mlResult);

    // Step 5: Calculate hybrid risk
    const hybridRisk = calculateHybridRisk(mlResult.probability, questionnairePercentage);

    console.log('🎯 FINAL RISK BREAKDOWN:');
    console.log(`   ML Base: ${(mlResult.probability * 100).toFixed(2)}%`);
    console.log(`   Questionnaire: ${questionnairePercentage.toFixed(2)}%`);
    console.log(`   Questionnaire Bonus: ${(questionnairePercentage * 0.7).toFixed(2)}%`);
    console.log(`   💥 CALCULATED FINAL RISK: ${hybridRisk.toFixed(2)}%`);

    // Step 6: Prepare final result
    const finalResult = {
      ml_raw: mlResult,
      questionnaire_score: questionnairePercentage,
      hybrid_risk: hybridRisk,
      predicted_glucose: mappedData.avg_glucose_level,
      used_glucose_prediction: formData.knowsGlucose === "I don't know",
      prediction: mlResult.prediction,
      probability: mlResult.probability,
      risk_level: mlResult.risk_level || (hybridRisk >= 50 ? 'High' : hybridRisk >= 30 ? 'Moderate' : 'Low'),
      message: mlResult.message,
      patientId: mlResult.patientId
    };

    console.log('💾 Final Result:', finalResult);
    console.log('🚀 === COMPREHENSIVE PREDICTION END ===');

    return {
      success: true,
      data: finalResult,
      message: mlResult.message || 'Prediction successful'
    };

  } catch (error) {
    console.error('❌ Error in prediction:', error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Prediction failed'
    };
  }
};

/* ========== GET PREDICTION HISTORY ========== */
export const getPredictionHistory = async () => {
  try {
    const response = await api.get('/symptom/history');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Get history error:', error);
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

/* ========== GET ASSESSMENT BY ID ========== */
export const getAssessment = async (id) => {
  try {
    const response = await api.get(`/symptom/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Get assessment error:', error);
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

/* ========== SUBMIT FAST TEST ========== */
export const submitFASTTest = async (data) => {
  try {
    const response = await api.post('/symptom/fast-test', data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ FAST test error:', error);
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

/* ========== GET RISK FACTORS ========== */
export const getRiskFactors = async () => {
  try {
    const response = await api.get('/symptom/risk-factors');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Get risk factors error:', error);
    return { success: false, error: error.response?.data?.error || error.message };
  }
};

export default {
  predictStrokeRisk,
  getPredictionHistory,
  getAssessment,
  submitFASTTest,
  getRiskFactors
};