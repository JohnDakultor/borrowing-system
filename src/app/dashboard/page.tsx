"use client";

import { useEffect, useState } from "react";
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
import { PackageCheck, PackageX, Archive, Menu, LayoutDashboard} from "lucide-react";

type Item = {
  id: string;
  name: string;
  stock: number;
};

type BorrowedItem = {
  id: string;
  name: string;
  borrower: string;
  itemId: string;
  dateBorrowed: string;
  status: string;
};

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [borrowedItems, setBorrowedItems] = useState<BorrowedItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [itemRes, borrowRes] = await Promise.all([
        fetch("/api/item"),
        fetch("/api/borrowed"),
      ]);

      const itemData = await itemRes.json();
      const borrowData = await borrowRes.json();

      setItems(itemData);
      setBorrowedItems(borrowData);
    };

    fetchData();
  }, []);

  const totalItems = items.length;
  const totalBorrowed = borrowedItems.length;
  const totalInStock = items.reduce((sum, item) => sum + item.stock, 0);

  
  const borrowedMap = borrowedItems.reduce<Record<string, number>>((acc, borrow) => {
    if (borrow.status === "Borrowed") {
      acc[borrow.itemId] = (acc[borrow.itemId] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
        <LayoutDashboard className="text-yellow-400" size={28} /> Borrowed Items
      </h1>

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 text-white shadow-md rounded-xl">
          <CardContent className="flex items-center justify-between p-4 sm:p-6">
            <div>
              <p className="text-sm text-slate-400">Total Items</p>
              <p className="text-2xl font-semibold">{totalItems}</p>
            </div>
            <Archive className="text-blue-500" size={24} />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white shadow-md rounded-xl">
          <CardContent className="flex items-center justify-between p-4 sm:p-6">
            <div>
              <p className="text-sm text-slate-400">Items Borrowed</p>
              <p className="text-2xl font-semibold">{totalBorrowed}</p>
            </div>
            <PackageX className="text-red-500" size={24} />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 text-white shadow-md rounded-xl">
          <CardContent className="flex items-center justify-between p-4 sm:p-6">
            <div>
              <p className="text-sm text-slate-400">Items In Stock</p>
              <p className="text-2xl font-semibold">{totalInStock}</p>
            </div>
            <PackageCheck className="text-green-500" size={24} />
          </CardContent>
        </Card>
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
  {items.map((item) => {
    const borrowedCount = borrowedMap[item.id] || 0;

    let status = "Available";
    let badgeVariant: "default" | "destructive" | "secondary" = "default";

    if (item.stock === 0) {
      status = "Not Available";
      badgeVariant = "destructive";
    } else if (borrowedCount > 0 && item.stock > 0) {
      status = "Borrowed & Available";
      badgeVariant = "secondary";
    } else if (borrowedCount > 0) {
      status = "Borrowed";
      badgeVariant = "destructive";
    }

    return (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <Badge variant={badgeVariant}>{status}</Badge>
        </TableCell>
        <TableCell>{item.stock}</TableCell>
      </TableRow>
    );
  })}
</TableBody>

        </Table>
      </div>
    </div>
  );
}
