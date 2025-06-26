"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  PackageCheck,
  PackageX,
  Archive,
} from "lucide-react";

const dummyAnalytics = [
  {
    title: "Total Items",
    value: 120,
    icon: <Archive className="text-blue-500" size={24} />,
  },
  {
    title: "Items Borrowed",
    value: 42,
    icon: <PackageX className="text-red-500" size={24} />,
  },
  {
    title: "Items In Stock",
    value: 78,
    icon: <PackageCheck className="text-green-500" size={24} />,
  },
];

const dummyItems = [
  { name: "Projector", status: "Borrowed", stock: 0 },
  { name: "Laptop", status: "In Stock", stock: 3 },
  { name: "HDMI Cable", status: "In Stock", stock: 10 },
  { name: "Whiteboard Marker", status: "Borrowed", stock: 0 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyAnalytics.map((stat, idx) => (
          <Card
            key={idx}
            className="bg-slate-800 text-white shadow-md rounded-xl"
          >
            <CardContent className="flex items-center justify-between p-4 sm:p-6">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 text-white overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Item Overview</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Item</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">In Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyItems.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Borrowed" ? "destructive" : "default"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
