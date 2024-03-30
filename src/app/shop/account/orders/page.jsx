"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderDopdown from "./OrderDopdown";
import { useEffect, useState } from "react";
import { fetchUserOrders, getOrder } from "@/app/helpers/action";
import { useStore } from "@/app/store/zustandStore";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const [data, setData] = useState([]);
  const email = useStore(useShallow((state) => state.user.email));
  useEffect(() => {
    const fetchOrder = async () => {
      let order = await getOrder(email);
      setData(order);
    };
    fetchOrder();
  }, []);

  return (
    <div className=" w-full px-4 sm:px-[20px] max-h-[90vh] scroll min-h-[500px] overflow-scroll  sm:py-[30px] py-0 space-y-5">
      <div className=" w-full border-b pb-3 relative ">
        <h3 className="font-bold leading-7 text-gray-900  sm:text-2xl text-lg">
          Orders
        </h3>
        <p className="mt-1 max-w-2xl text-sm  leading-3 sm:leading-6 text-gray-500">
          List of all your orders
        </p>
      </div>

      <Table className=" border w-full">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data ? (
            data.length > 0 ? (
              data.map((doc) => (
                <TableRow key={doc._id}>
                  <TableCell className="font-medium">{doc.orderId}</TableCell>
                  <TableCell>{doc.status}</TableCell>
                  <TableCell>{doc?.paymentInfo?.method}</TableCell>
                  <TableCell>{Object.keys(doc.products).length}</TableCell>
                  <TableCell>Rs {doc.amount}</TableCell>
                  <TableCell className="text-right w-[100px]">
                    <OrderDopdown orderID={doc.orderId} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
