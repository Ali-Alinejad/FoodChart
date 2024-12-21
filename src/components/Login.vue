<template>
  <div class="login-page flex justify-center items-center min-h-screen h-[70vh] bg-red-700 relative">
    <div class="grid grid-cols-2 w-full max-w-6xl z-10">
      
      <div class="flex justify-center items-center bg-black opacity-70 rounded-l-xl text-white p-10 font-bold text-3xl">
        <table class="min-w-full table-auto border-collapse text-[14px] text-center">
          <thead>
            <tr class=" text-white">
              <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">نوع ۲</th>
              <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">نوع ۱</th>
              <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">غذا</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(day, index) in allDays" :key="index"
                :class="{
                  'bg-orange-600/40': isToday(index),
                  'hover:bg-gray-900': !isToday(index),
                  'transition duration-300': true
                }">
              <td class="py-4 px-4 border-b border-gray-600">{{ menuItemsMap[day]?.food[1]?.name || '---' }}</td>
              <td class="py-4 px-4 border-b border-gray-600">{{ menuItemsMap[day]?.food[0]?.name || '---' }}</td>
              <td class="py-4 px-4 border-b border-gray-600 text-orange-200">{{ day }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-span-1 bg-black bg-opacity-70 text-center text-white p-4 rounded-r-xl flex justify-center items-center">
        <div class="w-full max-w-md">
          <h1 class="login-title text-3xl font-semibold mb-10">ورود به سامانه</h1>
          <form @submit.prevent="login" class="login-form flex flex-col space-y-4">
            <input
              v-model="username"
              type="text"
              placeholder="شماره کاربری"
              class="login-input p-3 rounded-md text-center text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              required
            />
            <input
              v-model="password"
              type="password"
              placeholder="رمز عبور"
              class="login-input text-center p-3 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              required
            />
            <button type="submit" class="login-button bg-orange-600 text-white py-3 rounded-md hover:bg-orange-500 transition duration-300">
              ورود
            </button>
          </form>

          <div class="mt-10 w-full text-center text-white">
            <div class="font-semibold text-sm opacity-70 mb-2">{{ currentDay }}</div>
            <p class="font-semibold text-sm opacity-50">{{ currentDate }}</p>
          </div>
          
        </div>
      </div>
      
    </div>

    <div class="background-image absolute top-0 left-0 right-0 bottom-0 bg-cover bg-black/30 bg-center bg-blend-multiply z-0" style="background-image: url('/images/login1.jpg')"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import moment from 'moment-jalaali';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const menuItems = ref([]);
    const router = useRouter();

    const today = new Date().getDay();
    const iranianWeekDay = (today + 1) % 7;

    const fallbackDays = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'];
    const allDays = ref(fallbackDays);
    const menuItemsMap = ref({});

    const isToday = (index) => {
      return iranianWeekDay === index;
    };

    const currentDate = computed(() => {
      return moment().format('jYYYY/jMM/jDD');
    });

    const currentDay = computed(() => {
      const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'];
      return days[iranianWeekDay];
    });

    const translateDay = (dayName) => {
      const daysMapping = {
        Sunday: 'یک‌شنبه',
        Monday: 'دوشنبه',
        Tuesday: 'سه‌شنبه',
        Wednesday: 'چهارشنبه',
        Thursday: 'پنج‌شنبه',
        Friday: 'جمعه',
        Saturday: 'شنبه',
      };
      return daysMapping[dayName] || dayName; // در صورت نبودن ترجمه، مقدار اصلی بازمی‌گردد
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://192.168.17.52:8585/api/weekly-menu/');
        menuItems.value = response.data;
        menuItems.value.forEach((item, index) => {
          const dayName = translateDay(item.day_name);
          menuItemsMap.value[dayName] = { ...item, index };
        });
      } catch (error) {
        console.error('خطا در دریافت منو:', error);
      }
    };

    onMounted(() => {
      fetchMenuItems();
    });

    const login = async () => {
      if (username.value && password.value) {
        try {
          const response = await axios.post('http://192.168.17.52:8585/auth/jwt/create', {
            personnel_code: username.value,
            password: password.value,
          });

          if (response.status === 200) {
            console.log('توکن دریافت شد:', response.data);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            router.push('/reserve');
          }
        } catch (error) {
          console.error('خطا در ارسال درخواست:', error);
          alert('خطا در ورود! لطفاً دوباره تلاش کنید.');
        }
      } else {
        alert('لطفاً اطلاعات را وارد کنید!');
      }
    };

    return {
      username,
      password,
      login,
      menuItems,
      isToday,
      currentDate,
      currentDay,
      translateDay,
      allDays,
      menuItemsMap,
    };
  },
};
</script>


<style scoped>
</style>
