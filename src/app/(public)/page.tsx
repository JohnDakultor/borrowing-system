"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] px-6 py-16 text-center">
      {/* Hero Section */}
      <div className="max-w-2xl w-full space-y-6 animate-fadeIn">
        <h1 className="text-5xl font-bold tracking-tight leading-tight text-gray-900">
          Welcome to <span className="text-primary">Borrowly</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          A modern borrowing system to manage and track item checkouts with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
         

          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg">
                Admin Login
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm backdrop-blur-sm bg-white/70 border border-gray-200 shadow-xl rounded-xl">
              <DialogTitle className="text-xl font-semibold mb-4">
                Admin Login
              </DialogTitle>

              <form className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-5xl w-full px-4 animate-fadeUp">
        {[
          {
            title: "Live Item Tracking",
            desc: "Know who borrowed what and when. Instant updates and logs.",
          },
          {
            title: "Inventory Management",
            desc: "Add, edit, and manage item availability in real-time.",
          },
          {
            title: "Simple UI",
            desc: "Built with shadcn/ui and Geist for a clean, focused interface.",
          },
          {
            title: "Admin Panel",
            desc: "Secure admin login and control over users and logs.",
          },
        ].map((feature, idx) => (
          <Card
            key={idx}
            className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-md transition hover:shadow-xl rounded-2xl"
          >
            <CardContent className="p-6 text-left">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
