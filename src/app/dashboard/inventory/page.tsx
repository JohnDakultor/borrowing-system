"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

type Item = {
  id: string;
  name: string;
  category: string;
  stock: number;
  available: boolean;
};

export default function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ name: "", category: "", stock: "" });

  const fetchItems = async () => {
    const res = await fetch("/api/item");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        stock: parseInt(form.stock),
      }),
    });

    if (res.ok) {
      await fetchItems();
      setForm({ name: "", category: "", stock: "" });
    } else {
      const err = await res.json();
      console.error("Add item failed:", err.error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
        <Package className="text-yellow-400" size={28} /> Borrowed Items
      </h1>

      {/* Add Item Form */}
      <div className="bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Item Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="bg-slate-700 text-white"
          />
          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="bg-slate-700 text-white"
          />
          <Input
            placeholder="Quantity"
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
            className="bg-slate-700 text-white"
          />
          <Button type="submit" className="w-full md:w-auto">
            Add
          </Button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 text-white overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">All Inventory</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Item</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">In Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Badge variant={item.available ? "default" : "destructive"}>
                    {item.available ? "In Stock" : "Borrowed"}
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
