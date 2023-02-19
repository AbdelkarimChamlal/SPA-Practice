<script setup>
    import stepsData from '@/stores/StepData.js';
    import { ref } from 'vue';
    let steps = stepsData.value.steps;


    let isCurrentStep = (stepId) => {
        return stepsData.value.currentStep === stepId;
    }

    const updateCurrentStep = (stepId) => {
        stepsData.value.currentStep = stepId;
    }

    const toggleSelectedPlanDuration = () => {
        stepsData.value.steps[2].data.selectedPlanDuration = stepsData.value.steps[2].data.selectedPlanDuration == 'monthly' ? 'yearly' : 'monthly';
    }

    const triedToSubmit = ref(false);

    const confirmed = ref(false);

    const confirmHandler = () => {
        triedToSubmit.value = true;
        // validate that the name & email & phone are not empty and are valid
        if (stepsData.value.steps[1].data.name == '' || stepsData.value.steps[1].data.email == '' || stepsData.value.steps[1].data.phone == '') {
            alert('Please fill in all the fields');
            stepsData.value.currentStep = 1;
        }

        // validate that the email is valid
        else if (!validateEmail(stepsData.value.steps[1].data.email)) {
            alert('Please enter a valid email address');
            stepsData.value.currentStep = 1;
        }

        // validate that the phone is valid
        else if (!validatePhone(stepsData.value.steps[1].data.phone)) {
            alert('Please enter a valid phone number');
            stepsData.value.currentStep = 1;
        }else{
            confirmed.value = true;
        }
    }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        var re = /^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{3}$/;
        return re.test(phone);
    }

</script>

<template>
    <div class="main">
        <div class="sidebar">
            <div class="sidebar-steps">
                <div class="sidebar-step" v-for="step in steps" :key="step.id" @click="updateCurrentStep(step.id)">
                    <div class="sidebar-step-details">
                        <div class="sidebar-step-number" :class="{'sidebar-step-active': isCurrentStep(step.id)}">
                            {{ step.id }}
                        </div>

                        <div class="sidebar-step-info">
                            step {{ step.id }}
                            <h3>{{ step.slug }}</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="content" v-if="stepsData.currentStep <= 4 && !confirmed">
            <div class="steps-content-container">
                <div class="step-title">{{ steps[stepsData.currentStep].title}}</div>

                <div class="step-description">{{ steps[stepsData.currentStep].description }}</div>

                <div  class="step-1-content" v-if="isCurrentStep(1)">
                    
                    <div>
                        <div>Name</div>
                        <input  type="text" placeholder="e.g. StephenKing"  v-model="steps[1].data.name" />   
                        <div class="error-message" v-if="triedToSubmit && steps[1].data.name == ''">Please enter your name</div>
                    </div>

                    <div>
                        <div>Email Address</div>
                        <input  type="text"  placeholder="e.g. stephenking@lorem.com"  v-model="steps[1].data.email"  />  
                        <div class="error-message" v-if="triedToSubmit && steps[1].data.email == ''">Please enter your email</div>
                        <div class="error-message" v-if="triedToSubmit && !validateEmail(steps[1].data.email)">Please enter a valid email</div>
                    </div>

                    <div>
                        <div>Phone Number</div>
                        <input  type="text"  placeholder="e.g. +1 234 567 890"  v-model="steps[1].data.phone" />
                        <div class="error-message" v-if="triedToSubmit && steps[1].data.phone == ''">Please enter your phone number</div>
                        <div class="error-message" v-if="triedToSubmit && !validatePhone(steps[1].data.phone)">Please enter a valid phone number</div> 
                    </div>
                </div>

                <div class="step-2-content" v-if="isCurrentStep(2)">
                    <div class="plans">
                        <div  class="plan"  v-for="plan in steps[2].data.plans"  :key="plan.id" @click="steps[2].data.selectedPlanId = plan.id" :class="{'plan-active': plan.id === steps[2].data.selectedPlanId}">
                            <div class="plan-icon">
                                <img :src="plan.icon" alt="plan icon" />
                            </div>
                            <div class="plan-details">
                                <div class="plan-title">
                                    {{  plan.name }}
                                </div>

                                <div class="plan-price">
                                    ${{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? plan.monthlyPrice : plan.yearlyPrice }}/{{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'mo' : 'yr' }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="plans-duration" @click="toggleSelectedPlanDuration">
                        <div :class="{ 'selected-duration': stepsData.steps[2].data.selectedPlanDuration == 'monthly' }">
                            Monthly
                        </div>
                        <div class="change-duration"  :class = "{'yearly-duration': stepsData.steps[2].data.selectedPlanDuration == 'yearly'}">
                            <div class="ball" ></div>
                        </div>
                        <div :class="{ 'selected-duration': stepsData.steps[2].data.selectedPlanDuration == 'yearly' }"> 
                            Yearly
                        </div>
                    </div>

                </div>  

                <div  class="step-3-content" v-if="isCurrentStep(3)">
                    <div class="custom-options">
                        <div  class="custom-option" v-for="option in stepsData.steps[3].data.options" :key="option.id"  @click="option.selected = !option.selected" :class="{'custom-option-active': option.selected}" >
                            <div class="custom-option-status" :class="{'custom-option-status-checked': option.selected}">
                                <div class="custom-option-checked" v-if="option.selected"></div> 
                            </div>
                            <div class="custom-option-details">
                                <div class="custom-option-name">
                                    {{ option.name }}
                                </div>

                                <div class="custom-option-description">
                                    {{ option.description }}
                                </div>
                            </div>

                            <div class="custom-option-price">
                                ${{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? option.monthlyPrice :  option.yearlyPrice }}/{{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'mo' : 'yr' }}
                            </div>
                        </div>  
                    </div>
                </div>  

                <div  class="step-4-content" v-if="isCurrentStep(4)">
                    <div class="selected-details">
                        <div class="selected-plan">
                            <div class="selected-plan-details">
                                <div class="selected-plan-name">
                                    {{ steps[2].data.plans[steps[2].data.selectedPlanId - 1].name }} ({{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'Monthly' : 'Yearly' }})
                                </div>
                                <div class="change-plan-duration" @click = "toggleSelectedPlanDuration">
                                    Change
                                </div>
                            </div>
                            <div class="selected-plan-price">
                                ${{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? steps[2].data.plans[steps[2].data.selectedPlanId - 1].monthlyPrice : steps[2].data.plans[steps[2].data.selectedPlanId - 1].yearlyPrice }}/{{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'mo' : 'yr' }}
                            </div>
                        </div>

                        <div class="selected-customization" v-if="steps[3].data.options.filter(option => option.selected).length > 0">
                            <hr />
                            <div class="selected-customization-options">
                                <div  class="selected-customization-option" v-for="option in steps[3].data.options.filter(option => option.selected)" :key="option.id">
                                    <div class="selected-customization-option-name">
                                        {{ option.name }}
                                    </div>

                                    <div class="selected-customization-option-price">
                                       +${{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? option.monthlyPrice :  option.yearlyPrice }}/{{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'mo' : 'yr' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="selected-customization-total">
                        <div class="selected-customization-total-title">
                            Total (per {{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'month' : 'year' }})
                        </div>
                        <div class="selected-customization-total-price">
                            ${{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? steps[2].data.plans[steps[2].data.selectedPlanId - 1].monthlyPrice + steps[3].data.options.filter(option => option.selected).reduce((acc, option) => acc + option.monthlyPrice, 0) : steps[2].data.plans[steps[2].data.selectedPlanId - 1].yearlyPrice + steps[3].data.options.filter(option => option.selected).reduce((acc, option) => acc + option.yearlyPrice, 0) }}/{{ stepsData.steps[2].data.selectedPlanDuration == 'monthly' ? 'mo' : 'yr' }}
                        </div>
                    </div>
                </div>  

            </div>

            <div class="navbar">
                <div  class="navbar-back" @click="stepsData.currentStep > 1 ? stepsData.currentStep-- : stepsData.currentStep = 1" v-if="!isCurrentStep(1)" >
                    <h3>Go Back</h3>
                </div>

                <div   class="navbar-next"  @click="stepsData.currentStep < 4 ? stepsData.currentStep++ : confirmHandler()" >
                    <h3>{{ stepsData.currentStep == 4 ? 'Confirm' : 'Next Step' }}</h3>
                </div>
            </div>
        </div>
    
        <div class="content" v-if="confirmed">
            <div class="steps-content-container" data="thank-you">
                <div class="thank-you">
                    <img src="/src/assets/icon-thank-you.svg" alt="Thank You" />
                    <h1>Thank You!</h1>
                    <h3>Thanks for confirming your subscription! We hope you have fun 
                        using our platform. If you ever need support, please feel free 
                        to email us at support@loremgaming.com.
                    </h3>
                </div>
            </div>
        </div>
    </div>


</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

:root{
    --color-primary-700: hsl(213, 96%, 18%);
    --color-primary-400: hsl(243, 100%, 62%); 
    --color-primary-300: hsl(228, 100%, 84%);
    --color-primary-200: hsl(206, 94%, 87%);
    --color-secondary-700: hsl(354, 84%, 57%);
    --color-nuetral-700: hsl(231, 11%, 63%);
    --color-nuetral-500: hsl(229, 24%, 87%);
    --color-nuetral-300: hsl(217, 100%, 97%);
    --color-nuetral-100: hsl(231, 100%, 99%);
    --color-nuetral: hsl(0, 0%, 100%);
}


*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
}

body{
  background-color: var(--color-nuetral-300);
}

.error-message{
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    text-decoration: dotted;
}

.sidebar{
    width: 100%;
    height: 270px;
    background-image: url('/src/assets/bg-sidebar-mobile.svg');
    background-repeat: no-repeat;
    background-size: cover;
}

.sidebar-steps{
    width: 85%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 4rem;
}

.sidebar-step-number{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-nuetral-500);
    font-weight: 500;
    font-size: 1.3rem;
    border: 2px solid var(--color-nuetral-500);
}

.sidebar-step-number:hover{
    cursor: pointer;
    background-color: var(--color-nuetral-500);
    color: var(--color-primary-700);
}

.sidebar-step-active{
    background-color: var(--color-nuetral-500);
    color: var(--color-primary-700);
}

.sidebar-step-info{
    display: none;
}

.steps-content-container{
    position: absolute;
    width: calc(100% - 4rem);
    z-index: 2;
    top: -8rem;
    left: 2rem;
    padding: 2rem;
    color: var(--color-primary-700);
    background-color: var(--color-nuetral);
    border-radius: .75rem;
    box-shadow: 24px 10px 33px 6px rgb(0 0 0 / 10%);
}

.step-title{
    color: var(--color-primary-700);
    font-size: 2rem;
    font-weight: 700;
}

.step-description{
    color: var(--color-nuetral-700);
    font-size: 1.2rem;
    font-weight: 400;
    margin: 1rem 0;
}

.content{
    position:relative;
}

.step-1-content{
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
}

input[type~="text"]{
    margin: 2px 0;
    width: 100%;
    padding: 1rem .9rem;
    border: 1px solid var(--color-nuetral-500);
    border-radius: .3rem;
    font-weight: 500;
    color: var(--color-primary-700);
}

input[type~="text"]::placeholder{
    color: var(--color-nuetral-700);
}

.plans{
    display: grid;
    gap: 1.5rem;
}

.plan{
    display: flex;
    padding: 1rem;
    gap: 1rem;
    border-radius: .75rem;
    border: 1px solid var(--color-nuetral-500);
}

.plan-active{
    border: 1px solid var(--color-primary-700);
    background-color: var(--color-nuetral-300);
}

.plan-details{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.plans-duration{
    display: flex;
    margin: 1rem 0;
    justify-content: space-around;
    gap: 1rem;
    border-radius: .75rem;
    padding: 1rem 0;
    background-color: var(--color-nuetral-300);
}

.plans-duration div{
    font-weight: 700;
    color: var(--color-nuetral-700);
}

.plan .plan-details .plan-title{
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-primary-700);
}

.plan .plan-details .plan-price{
    font-size: .8rem;
    font-weight: 500;
    color: var(--color-nuetral-700);
}

.change-duration{
    background-color: var(--color-primary-700);
    padding: .3rem 1.75rem .3rem .35rem;
    border-radius: 100rem;
}

.change-duration:hover{
    cursor: pointer;
}

.selected-duration{
    color: var(--color-primary-700) !important;
}


.ball{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: var(--color-nuetral-300);
}

.yearly-duration{
    padding: .3rem .35rem .3rem 1.75rem;
}


.custom-options{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}

.custom-option{
    display: flex;
    align-items: center;
    padding: 1rem;
    gap : 1rem;
    border-radius: .75rem;
    border: 1px solid var(--color-nuetral-500);
}

.custom-option:hover{
    cursor: pointer;
    background-color: var(--color-nuetral-300);
    border: 1px solid var(--color-primary-400);
}

.custom-option-price{
    font-size: 1rem;
    font-weight: 400;
    margin-left: auto;
    color: var(--color-primary-400);
}


.custom-option-status{
    display: flex;
    align-items: center;
    gap: .5rem;
    width: 1.5rem;
    height: 1.5rem;
    font-size: .8rem;
    font-weight: 500;
    color: var(--color-nuetral-700);
    padding: .3rem .3rem;
    border-radius: 0.35rem;
    border: 1px solid var(--color-nuetral-500);
}

.custom-option-status-checked{
    background-color: var(--color-primary-400);
    border: 1px solid var(--color-primary-400);
}

.custom-option-checked {
    width: .85rem;
    height: .75rem;
    display: grid;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    background-color: var(--color-nuetral-100);
    
    place-content: center;
}

.custom-option-active{
    border: 1px solid var(--color-primary-400);
    background-color: var(--color-nuetral-300);
}

.custom-option-details{
    display: flex;
    flex-direction: column;
    gap: .285rem;
}

.custom-option-name{
    color: var(--color-primary-700);
    font-size: 1rem;
    font-weight: 700;
}

.custom-option-description{
    font-size: .8rem;
    font-weight: 500;
    color: var(--color-nuetral-700);
}



.selected-details{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    background-color: var(--color-nuetral-300);
    padding: 1.5rem 1rem; 
    border-radius: .75rem;
}

.selected-plan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.selected-plan-details{
    display: flex;
    flex-direction: column;
    gap: .15rem;
}

.selected-plan-name{
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-primary-700);
}

.change-plan-duration{
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-nuetral-700);
    text-decoration: underline;
    cursor: pointer;
}

.selected-plan-price{
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-primary-700);
}

hr{
    border: 1px solid var(--color-nuetral-500);
}

.selected-customization-options{
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.selected-customization-option{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.selected-customization-option-name{
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-nuetral-700);
}


.selected-customization-option-price{
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-primary-700);
}

.selected-customization-total{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1rem 0 1rem;
}

.selected-customization-total-title{
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-nuetral-700);
}

.selected-customization-total-price{
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-primary-400);
}

.thank-you{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 0;
}

.thank-you h1{
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary-700);
}

.thank-you h3{
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    color: var(--color-nuetral-700);
}

.navbar{
    position: fixed;
    z-index: 3;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.5rem 2rem;
    background-color: var(--color-nuetral);
}

.navbar-back{
    border-radius: .75rem;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.3rem;
    color: var(--color-nuetral-700);
}

.navbar-back:hover{
    cursor: pointer;
    color: var(--color-primary-700);
}

.navbar-next{
    padding: 1rem 1.5rem;
    background-color: var(--color-primary-700);
    border-radius: .35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-nuetral-300);
    font-weight: 500;
    font-size: 1.3rem;
    margin-left: auto;
}

.navbar-next:hover{
    cursor: pointer;
    background-color: var(--color-primary-700);
}



@media screen and (min-width: 800px){
    .main{
        display: flex;
        gap: 2rem;
        padding: 1rem;
        height: 100svh;
        background-color: var(--color-nuetral);
    }

    .sidebar{
        width: min(23rem, 40%);
        height: 100%;
        border-radius: 1rem;
        background-image: url('/src/assets/bg-sidebar-desktop.svg');
    }

    .sidebar-steps{
        flex-direction: column;
        justify-content: start;
        gap: 1.75rem;
        padding: 3rem 1.25rem;
    }

    .sidebar-step-details{
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 1rem;
    }

    .sidebar-step-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-transform: uppercase;
        color: var(--color-nuetral-500);
    }

    .sidebar-step-info h3{
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-nuetral-100);
    }

    .content{
        width: calc(90% - min(20rem, 40%));
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 1rem;
        padding: 1rem 5rem;
    }

    .steps-content-container{
        position: static;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: none;

    }

    .navbar{
        position: static;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1.5rem 2rem;
        background-color: var(--color-nuetral);
    }

    .step-title{
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-primary-700);
    }
    
    .plans{
        display: flex;
        flex-direction: row;
        /* justify-content: space-between; */
        gap: 1rem;
        padding: 1rem 0;
    }

    .plan{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 1rem;
        padding: 1rem;
        gap: 5rem;
        background-color: var(--color-nuetral-300);
    }

    .steps-content-container[data="thank-you"]{
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    }

}

</style>