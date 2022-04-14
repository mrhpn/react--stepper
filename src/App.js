import React from 'react';
import {
  ChakraProvider,
  Box,
  extendTheme,
  Input,
  Flex,
  Button,
} from '@chakra-ui/react';
import { Steps, Step, useSteps, StepsStyleConfig } from 'chakra-ui-steps';
import FormField from './components/formField';
import { useForm } from 'react-hook-form';
import './App.css';

const theme = extendTheme({
  components: {
    Steps: StepsStyleConfig,
  },
});

const required = {
  value: true,
  message: 'This is required.',
};

const App = () => {
  const { activeStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const handleNextStep = async () => {
    let isValid = false;

    switch (activeStep) {
      case 0:
        isValid = await trigger(['firstName', 'lastName']);
        break;
      case 1:
        isValid = await trigger(['city']);
        break;
    }

    if (isValid) nextStep();
  };

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} maxW={400}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Steps activeStep={activeStep}>
            <Step label="User Details">
              <Box mt={5}>
                <FormField
                  label="First Name"
                  error={errors.firstName && errors.firstName.message}>
                  <Input {...register('firstName', { required })} />
                </FormField>
              </Box>
              <Box mt={2} mb={3}>
                <FormField
                  label="Last Name"
                  error={errors.lastName && errors.lastName.message}>
                  <Input {...register('lastName', { required })} />
                </FormField>
              </Box>
            </Step>
            <Step label="Address">
              <Box mt={5} mb={3}>
                <FormField
                  label="City"
                  error={errors.city && errors.city.message}>
                  <Input {...register('city', { required })} />
                </FormField>
              </Box>
            </Step>
            <Step label="Payment">
              <Box mt={5} mb={3}>
                <FormField
                  label="Card"
                  error={errors.card && errors.card.message}>
                  <Input {...register('card', { required })} />
                </FormField>
              </Box>
            </Step>
          </Steps>
          <Flex gap={2} my={2}>
            {activeStep !== 0 && <Button onClick={prevStep}>Previous</Button>}
            {activeStep !== 2 && <Button onClick={handleNextStep}>Next</Button>}
            {activeStep === 2 && <Button type="submit">Submit</Button>}
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default App;
