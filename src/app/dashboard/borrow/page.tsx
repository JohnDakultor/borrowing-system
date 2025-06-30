"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { HandCoins } from "lucide-react";

type BorrowedItem = {
  id: string;
  itemId: string;
  name: string;
  borrower: string;
  dateBorrowed: string;
  status: string;
};


type Item = {
  stock: number;
  id: string;
  name: string;
};

export default function Borrowed() {
  const [items, setItems] = useState<BorrowedItem[]>([]);
  const [availableItems, setAvailableItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ name: "", borrower: "" });

  const fetchAvailableItems = async () => {
    const [itemRes, borrowRes] = await Promise.all([
      fetch("/api/item"),
      fetch("/api/borrowed"),
    ]);

    const itemData = await itemRes.json();
    const borrowedData = await borrowRes.json();

    const available = itemData.filter((item: any) => item.stock > 0);

    setItems(borrowedData);
    setAvailableItems(available);
  };

  useEffect(() => {
    fetchAvailableItems();
  }, []);

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/borrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: "", borrower: "" });
      fetchAvailableItems();
    } else {
      const err = await res.json();
      console.error("Borrowing failed:", err?.error || res.statusText);
    }
  };

  const handleReturn = async (index: number) => {
    const item = items[index];

    const res = await fetch("/api/returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowId: item.id }),
    });

    if (res.ok) {
      fetchAvailableItems(); // refresh after return
    } else {
      const err = await res.json();
      console.error("Return failed:", err?.error || res.statusText);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
        <HandCoins className="text-yellow-400" size={28} /> Borrowed Items
      </h1>

      {/* Borrow Form */}
      <div className="bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Borrow an Item</h2>
        <form
          onSubmit={handleBorrow}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <select
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="bg-slate-700 text-white border-slate-600 p-2 rounded"
          >
            <option value="" disabled>
              Select Item
            </option>
            {availableItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name} ({item.stock} left)
              </option>
            ))}
          </select>

          <Input
            placeholder="Borrower Name"
            value={form.borrower}
            onChange={(e) => setForm({ ...form, borrower: e.target.value })}
            className="bg-slate-700 text-white border-slate-600 placeholder:text-slate-400"
            required
          />
          <Button type="submit" className="w-full md:w-auto">
            Borrow
          </Button>
        </form>
      </div>

      {/* Borrowed Items Table */}
      <div className="bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 text-white overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Current Borrowed List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Item</TableHead>
              <TableHead className="text-white">Borrower</TableHead>
              <TableHead className="text-white">Date Borrowed</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.borrower}</TableCell>
                <TableCell>{item.dateBorrowed}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{item.status}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleReturn(idx)}
                  >
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
