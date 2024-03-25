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
import connectDb from "@/lib/mongoose";
import Order from "@/app/models/Order";

export default async function Page() {
  async function getAddress() {
    "use server";
    await connectDb();
    const order = await Order.find({ status: "Paid" }).lean();
    return order ? order : [];
  }

  let data = await getAddress();
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
          {data.map((doc) => {
            return (
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
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
