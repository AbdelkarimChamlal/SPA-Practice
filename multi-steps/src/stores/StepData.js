import { ref } from 'vue';

export default ref({
    currentStep: 1,
    steps: {
        1: {
            id: 1,
            slug: 'YOUR INFO',
            title: 'Personal Info',
            description: 'Please provide your name, email address and phone number.',
            data: {
                name: '',
                email: '',
                phone: ''
            }
        },
        2: {
            id: 2,
            slug: 'SELECT PLAN',
            title: 'Select your plan',
            description: 'You have the option of monthly or yearly billing.',
            data: {
                selectedPlanId: 1,
                selectedPlanDuration: 'monthly',
                plans: [
                    {
                        id: 1,
                        name: 'Arcade',
                        monthlyPrice: 9,
                        yearlyPrice: 90,
                        yearlyDiscount: '2 months free',
                        icon : '/src/assets/icon-arcade.svg'
                    },
                    {
                        id: 2,
                        name: 'Advanced',
                        monthlyPrice: 12,
                        yearlyPrice: 120,
                        yearlyDiscount: '2 months free',
                        icon : '/src/assets/icon-advanced.svg'
                    },
                    {
                        id: 3,
                        name: 'Pro',
                        monthlyPrice: 15,
                        yearlyPrice: 150,
                        yearlyDiscount: '2 months free',
                        icon : '/src/assets/icon-pro.svg'
                    }
                ],
            }
        },
        3: {
            id: 3,
            slug: 'ADD-ONS',
            title: 'Pick add-ons',
            description: 'Add-ons help enhance your gaming experience.',
            data: {
                options: [
                    {
                        id: 1,
                        name: 'Online Service',
                        description: 'Access to multiplayer games',
                        monthlyPrice: 1,
                        yearlyPrice: 10,
                        selected: false,
                    },
                    {
                        id: 2,
                        name: 'Large Storage',
                        description: 'Extra 1TB of cloud storage',    
                        monthlyPrice: 2,
                        yearlyPrice: 20,
                        selected: false,
                    },
                    {
                        id: 3,
                        name: 'Customizable profile',
                        description: 'Customize theme on your profile',
                        monthlyPrice: 2,
                        yearlyPrice: 20,
                        selected: false,
                    },
                ]
            }
        },
        4: {
            id: 4,
            slug: 'SUMMARY',
            title: 'Finishing up',
            description: ' Double-check everything looks OK before confirming.',
            data: {
                confirmed: false
            }
        },
    }
  });
