import {
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useCollectionQuery from "../hooks/useCollectionQuery";
import { db } from "../share/firebase";
import { useAuth } from "../context/authContext";
// Components
import Layout from "../components/Layout";
import Badge from "../components/Badge";
import Common from "../components/Common";

const ShowOrders = () => {
  const { currentUser } = useAuth();
  const {
    data: ordersSnapshot,
    loading: ordersIsLoading,
    error: ordersHaveError,
  } = useCollectionQuery(
    "all-orders",
    query(collection(db, "orders"), orderBy("createdAt", "desc"))
  );
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    if (!ordersSnapshot?.empty && currentUser.email) {
      const ordersList: any[] = [];
      ordersSnapshot?.forEach((docSnap) => {
        const order: any = { id: docSnap.id, ...docSnap.data() };
        if (order.email === currentUser.email) {
          ordersList.push({ id: docSnap.id, ...docSnap.data() });
        }
      });
      setOrders(ordersList);
    }
    if (ordersSnapshot?.empty) {
      setOrders([]);
    }
  }, [ordersSnapshot, currentUser]);
  return (
    <Layout>
      <section>
        <Common title="Orders" />
        <div className="container">
          <div className="custom-table mt-12">
            {ordersIsLoading && (
              <div className="h-[300px] flex justify-center items-center">
                <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
              </div>
            )}
            {!ordersIsLoading && orders.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">City</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Total Payment</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4">
                          {order.id.slice(0, 10) + "..."}
                        </td>
                        <td className="px-6 py-4">{order.email}</td>
                        <td className="px-6 py-4">{order.city}</td>
                        <td className="px-6 py-4">{order.quantity}</td>
                        <td className="px-6 py-4">{order.total_payment}</td>
                        <td className="px-6 py-4">
                          {order.status === "waiting" && (
                            <Badge className="bg-yellow-200 text-yellow-400">
                              {order.status}
                            </Badge>
                          )}
                          {order.status === "confirmed" && (
                            <Badge className="bg-green-200 text-green-400">
                              {order.status}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {!ordersIsLoading && orders.length === 0 && (
              <div className="h-[300px] flex justify-center items-center">
                <h1 className="text-2xl font-semibold">There's no order yet</h1>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShowOrders;
