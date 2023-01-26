import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useCollectionQuery from "../hooks/useCollectionQuery";
import { db } from "../share/firebase";
import Layout from "../components/Layout";

const Dashboard = () => {
  const {
    data: ordersSnapshot,
    loading: ordersIsLoading,
    error: ordersHaveError,
  } = useCollectionQuery(
    "all-success-orders",
    query(collection(db, "orders"), where("status", "==", "confirmed"))
  );
  const [usersCount, setUsersCount] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const usersCountSnap = await getCountFromServer(collection(db, "users"));
      setUsersCount(usersCountSnap.data().count);
    })();
  }, []);
  useEffect(() => {
    const ordersList: any[] = [];
    ordersSnapshot?.forEach((doc) => {
      const order = { id: doc.id, ...doc.data() };
      ordersList.push(order);
    });
    setOrders(ordersList);
  }, [ordersSnapshot]);
  useEffect(() => {
    if (orders.length > 0) {
      const total_sales = orders.reduce((total, order) => {
        return total + Number(order.total_payment);
      }, 0);
      const items_count = orders.reduce((count, order) => {
        return count + order.quantity;
      }, 0);
      const orders_count = orders.reduce((count, order) => {
        return count + 1;
      }, 0);
      setTotalSales(total_sales);
      setItemsCount(items_count);
      setOrdersCount(orders_count);
    }
  }, [orders]);
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-20">
            <div className="flex flex-col gap-5 rounded p-5 bg-red-200">
              <span>Total Sales</span>
              <span className="text-xl font-semibold">{totalSales}</span>
            </div>
            <div className="flex flex-col gap-5 rounded p-5 bg-green-200">
              <span>Success Orders</span>
              <span className="text-xl font-semibold">{ordersCount}</span>
            </div>
            <div className="flex flex-col gap-5 rounded p-5 bg-blue-200">
              <span>Saled Products</span>
              <span className="text-xl font-semibold">{itemsCount}</span>
            </div>
            <div className="flex flex-col gap-5 rounded p-5 bg-yellow-200">
              <span>Total Users</span>
              <span className="text-xl font-semibold">{usersCount}</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
