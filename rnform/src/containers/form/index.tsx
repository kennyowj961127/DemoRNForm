import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import FirstForm from './firstForm';
import SecondForm from './secondForm';
import ThirdForm from './thirdForm';
import LastForm from './lastForm';
import {useForm} from 'react-hook-form';

const CustomProgressSteps = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      health_concerns: [],
      diets: [],
      is_daily_exposure: '',
      is_smoke: '',
      alcohol: '',
      allergies: [],
    },
  });

  const onSubmit = data => {
    if(data.diets.length === 1 && data.diets.some(i => i.id === 0)) {
      data.diets = [];
    }
    console.log(data);
  };

  const onNextStep = () => {
    if (currentStep === 0) {
      if (watch('health_concerns').length === 0) {
        Alert.alert('Please select atleast one health concern');
        return;
      }
    } else if (currentStep === 1) {
      if (watch('diets').length === 0) {
        Alert.alert('Please select atleast one diet');
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  const onPrevStep = () => {
    if (currentStep === 0) {
      navigation.navigate('Home');
    }
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const onSubmitSteps = () => {
    setCurrentStep(totalSteps);
    console.log('called on submit step.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FirstForm
            setValue={setValue}
            watch={watch}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
          />
        );
      case 1:
        return (
          <SecondForm
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            setValue={setValue}
            watch={watch}
          />
        );
      case 2:
        return <ThirdForm 
        setValue={setValue}
        watch={watch}
        onNextStep={onNextStep} 
        onPrevStep={onPrevStep} />;
      case 3:
        return (
          <LastForm
            setValue={setValue}
            watch={watch}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            handleSubmit={handleSubmit(onSubmit)}
          />
        );
      default:
        return <Text>All steps completed!</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContent}>{renderStepContent()}</View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onPrevStep} />
        {currentStep < totalSteps - 1 && (
          <Button title="Next" onPress={onNextStep} />
        )}
        {currentStep === totalSteps - 1 && (
          <Button title="Submit" onPress={onSubmitSteps} />
        )}
      </View> */}
      <ProgressBar
        progress={currentStep / (totalSteps - 1)}
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D9F2E7',
  },
  stepContent: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  progressBar: {
    marginTop: 10,
  },
  backButton: {
    marginTop: 10,
  },
});

export default CustomProgressSteps;
