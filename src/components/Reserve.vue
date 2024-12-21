<template>
  <div class="reserve-page flex justify-center min-h-screen relative">
    <div class="w-full h-[70vh] max-w-7xl z-10">
      <div class="max-w-10xl mx-auto p-10 mt-10 w-full bg-black bg-opacity-70 rounded-lg">
        <h1 class="text-2xl font-bold text-center mb-6 text-white">منوی هفتگی</h1>
        <div v-if="menuItems.length">
          <div class="overflow-x-auto shadow-lg rounded-lg">
            <table class="min-w-full table-auto border-collapse text-[14px] text-center">
              <thead>
                <tr class="text-white">
                  <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">انتخاب شده</th>
                  <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">روز</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(day, index) in allDays" :key="index">
                  <td class="px-10 py-2 border-t border-gray-600 text-white">
                    <div class="flex gap-8">
                      <button
                        :class="{
                          'opacity-50 cursor-not-allowed': !isFoodOrdered(menuItemsMap[day].food[0]?.name, menuItemsMap[day].date) && !isFoodOrdered(menuItemsMap[day].food[1]?.name, menuItemsMap[day].date),
                          'opacity-95 hover:text-yellow-500 hover:scale-105': isFoodOrdered(menuItemsMap[day].food[0]?.name, menuItemsMap[day].date) || isFoodOrdered(menuItemsMap[day].food[1]?.name, menuItemsMap[day].date)
                        }"
                        @click="handleDeleteOrder(menuItemsMap[day].date, menuItemsMap[day].index)"
                        class="text-white px-4 py-2 rounded-md transition duration-300 ring-1 ring-gray-100/50 active:scale-95"
                      >
                        حذف
                      </button>
                      <label
                        v-if="menuItemsMap[day] && menuItemsMap[day].food[0]"
                        @click="selectFood(menuItemsMap[day].index, 0)"
                        :class="[
                          selectedFood[menuItemsMap[day].index] === 0 ? '' : 'bg-white/50 opacity-50 rounded-2xl',
                          isFoodOrdered(menuItemsMap[day].food[0]?.name, menuItemsMap[day].date) ? 'rounded-2xl ring-2 ring-blue-500 bg-white opacity-95' : '',
                        ]"
                        :style="getFoodBackgroundStyle(menuItemsMap[day].food[0])"
                        class="w-1/2 cursor-pointer hover:scale-105 transition-all duration-300 h-24 flex items-center justify-center shadow-inner"
                      >
                        <span class="bg-black/50 w-full text-lg font-bold overflow-hidden">
                          {{ menuItemsMap[day].food[0]?.name || '---' }}
                        </span>
                      </label>
                      <label
                        v-else
                        class="w-1/2 cursor-pointer h-24 flex items-center justify-center shadow-inner bg-white/50 opacity-50"
                      >
                        <span class="bg-black/50 w-full text-lg font-bold overflow-hidden">---</span>
                      </label>
                      <label
                        v-if="menuItemsMap[day] && menuItemsMap[day].food[1]"
                        @click="selectFood(menuItemsMap[day].index, 1)"
                        :class="[
                          'opacity-50',
                          selectedFood[menuItemsMap[day].index] === 1 ? 'ring-2 ring-yellow-500 bg-white/50' : 'bg-white/50 rounded-2xl',
                          isFoodOrdered(menuItemsMap[day].food[1]?.name, menuItemsMap[day].date) ? 'ring-2 ring-blue-500 rounded-2xl bg-white opacity-95' : '',
                        ]"
                        :style="getFoodBackgroundStyle(menuItemsMap[day].food[1])"
                        class="w-1/2 text-lg font-bold cursor-pointer hover:scale-105 transition-all duration-300 h-24 flex items-center shadow-inner justify-center"
                      >
                        <span class="bg-black/50 w-full text-lg font-bold overflow-hidden">
                          {{ menuItemsMap[day].food[1]?.name || '---' }}
                        </span>
                      </label>
                      <label
                        v-else
                        class="w-1/2 text-lg font-bold cursor-pointer h-24 flex items-center shadow-inner justify-center bg-white/50 opacity-50"
                      >
                        <span class="bg-black/50 w-full text-lg font-bold overflow-hidden">---</span>
                      </label>
                    </div>
                  </td>
                  <td class="py-4 px-4 border-t border-gray-600 text-white font-semibold">
                    {{ day }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>
          <div class="overflow-x-auto shadow-lg rounded-lg">
            <table class="min-w-full table-auto border-collapse text-[14px] text-center">
              <thead>
                <tr class="text-white">
                  <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">انتخاب شده</th>
                  <th class="py-2 px-4 text-[18px] font-semibold border-b border-gray-200">روز</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(day, index) in fallbackDays" :key="index">
                  <td class="py-2 px-4 border-t border-gray-600 text-white">
                    <div class="flex gap-4">
                      <label class="w-1/2 cursor-pointer h-24 flex items-center justify-center shadow-inner bg-white/50 opacity-50">
                        <span class="bg-black/50 w-full text-lg font-bold overflow-hidden">---</span>
                      </label>
                      <label class="w-1/2 text-lg font-bold cursor-pointer h-24 flex items-center shadow-inner justify-center bg-white/50 opacity-50">
                        <span class="bg-black/50 w-full text-lg font-bold overflow-hidden">---</span>
                      </label>
                    </div>
                  </td>
                  <td class="py-4 px-4 border-t border-gray-600 text-white font-semibold">
                    {{ day }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="background-image absolute top-0 left-0 right-0 bottom-0 bg-cover bg-black/30 bg-center bg-blend-multiply z-0" style="background-image: url('/images/login1.jpg')"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import moment from 'moment-jalaali';

export default {
  name: 'Reserve',
  setup() {
    const menuItems = ref([]);
    const selectedFood = ref({});
    const orders = ref([]);
    const accessToken = localStorage.getItem('access_token');
    const fallbackDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'];
    const allDays = ref(fallbackDays);
    const menuItemsMap = ref({});

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/weekly-menu/`);
        menuItems.value = response.data;
        menuItems.value.forEach((item, index) => {
          const dayName = getShamsiDayName(item.date);
          menuItemsMap.value[dayName] = { ...item, index };
        });
      } catch (error) {
        console.error('خطا در دریافت منو:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/order/`, {
          headers: { Authorization: `JWT ${accessToken}` },
        });
        orders.value = response.data.results.map(order => ({
          id: order.id,
          food_name: order.food,
          date: order.date,
          link: order.link, // Ensure the link property is set
        }));
      } catch (error) {
        console.error('خطا در دریافت سفارش‌ها:', error);
      }
    };

    onMounted(() => {
      if (accessToken) {
        fetchMenuItems();
        fetchOrders();
      } else {
        console.error('توکن دسترسی موجود نیست!');
      }
    });

    const selectFood = async (index, foodIndex) => {
      if (!accessToken) {
        alert('Please log in to continue!');
        return;
      }

      const food = menuItems.value[index]?.food[foodIndex].name;
      const date1 = menuItems.value[index]?.date;
      const id = menuItems.value[index]?.food[foodIndex].id;

      if (!food || !date1) {
        alert('Please select food and date.');
        return;
      }

      const existingOrder = orders.value.find(order => order.date === date1);

      try {
        let response;
        if (existingOrder) {
          response = await axios.put(
            existingOrder.link,
            { food: id, date: date1 },
            { headers: { Authorization: `JWT ${accessToken}` } }
          );
        } else {
          response = await axios.post(
            `${apiBaseUrl}/order/`,
            { food: id, date: date1 },
            { headers: { Authorization: `JWT ${accessToken}` } }
          );
        }

        if (response.status === 200 || response.status === 201) {
          selectedFood.value[index] = foodIndex;
          if (existingOrder) {
            existingOrder.food_name = food;
          } else {
            orders.value.push({ food_name: food, date: date1, id: response.data.id, link: response.data.link });
          }
        } else {
          console.error('Unexpected response status:', response.status);
          alert('Unexpected error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error placing order:', error.response?.data || error.message);
        alert('There was an error placing your order. Please try again.');
      }
    };
    const deleteOrder = async (date, index) => {
      const existingOrder = orders.value.find(order => order.date === date);
    
      if (!existingOrder) {
        alert('No order found for this date.');
        return;
      }
    
      try {
        const response = await axios.delete(existingOrder.link, {
          headers: { Authorization: `JWT ${localStorage.getItem('access_token')}` }
        });
    
        if (response.status === 204) {
          orders.value = orders.value.filter(order => order.date !== date);
          selectedFood.value[index] = null;
          alert('Order deleted successfully.');
        } else {
          console.error('Unexpected response status:', response.status);
          alert('Unexpected error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting order:', error.response?.data || error.message);
        alert('There was an error deleting your order. Please try again.');
      }
    };

    const handleDeleteOrder = (date, index) => {
      deleteOrder(date, index);
    };

    const getFoodBackgroundStyle = (food) => {
      const foodImages = {
        'خوراک مرغ': '/images/chicken.jpg',
        'قیمه نسا': '/images/nesa.jpg',
        'چلو کباب میکس': '/images/kebabmix.jpg',
        'زرشک پلو با مرغ': '/images/zereshkplo.jpg',
        'ساندویچ ژامبون': '/images/zhambon.jpg',
        'هویج پلو': '/images/havij.jpg',
        'اکبر جوجه': '/images/akbarjoje.png',
        'مرغ با پلو بادمجان': '/images/morqbademjon.jpg',
        'باقالی پلو با ماهیچه': '/images/mahiche.jpg',
        'عدس پلو با گوشت چرخ کرده': '/images/adas-polo.jpg',
        'چلو کباب تابه ای': '/images/tabeii.jpg',
        'جوجه کباب': '/images/joje.jpg',
      };

      const defaultImage = '/images/default.jpg';
      const imageUrl = foodImages[food?.name] || food?.image || defaultImage;

      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };
    };

    const convertToShamsi = (date) => {
      return moment(date).format('jYYYY/jMM/jDD');
    };

    const getShamsiDayName = (date) => {
      const shamsiDate = moment(date).format('jYYYY/jMM/jDD');
      const dayOfWeek = moment(shamsiDate, 'jYYYY/jMM/jDD').day();
      const persianDayNames = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
      return persianDayNames[dayOfWeek];
    };

    const isFoodOrdered = (foodName, date) => {
      return orders.value.some(order => order.food_name === foodName && order.date === date);
    };

    return {
      menuItems,
      selectedFood,
      orders,
      selectFood,
      getFoodBackgroundStyle,
      isFoodOrdered,
      convertToShamsi,
      getShamsiDayName,
      fallbackDays,
      allDays,
      menuItemsMap,
      handleDeleteOrder,
    };
  },
};
</script>
