import { createRouter, createWebHistory } from "vue-router";
import StepView from "@/components/Steps.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "steps",
      component: StepView,
    }
  ],
});

export default router;
