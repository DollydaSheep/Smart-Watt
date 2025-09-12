"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function formatCurrency(value: number, currency: string = "USD", locale: string = "en-US") {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

type Appliance = {
  name: string;
  revenue: number;
  usage?: number;
  status?: "active" | "inactive";
};

export default function BillingsPage() {
  const appliances: Appliance[] = [
    { name: "Air Conditioner", revenue: 1240.5, usage: 45, status: "active" },
    { name: "Refrigerator", revenue: 860.2, usage: 30, status: "active" },
    { name: "Washing Machine", revenue: 410.75, usage: 15, status: "inactive" },
    { name: "Dishwasher", revenue: 355.0, usage: 8, status: "active" },
    { name: "Water Heater", revenue: 980.1, usage: 25, status: "active" },
    { name: "Heater", revenue: 720.0, usage: 35, status: "inactive" },
  ];

  const total = appliances.reduce((sum, a) => sum + a.revenue, 0);

  return (
    <main className="container py-10 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Electricity Revenue</h1>
        <p className="text-muted-foreground">Total current revenue and breakdown by appliance.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Total current revenue</CardTitle>
              <Badge className="rounded-md" variant="secondary">Live</Badge>
            </div>
            <CardDescription>Aggregated across all appliances.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold tracking-tight">
              {formatCurrency(total)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing</CardTitle>
            <CardDescription>Appliance with highest revenue</CardDescription>
          </CardHeader>
          <CardContent>
            {appliances.length > 0 && (
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {appliances[0].name}
                </div>
                <div className="text-muted-foreground">
                  {formatCurrency(appliances[0].revenue)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appliance Revenue</CardTitle>
          <CardDescription>Detailed breakdown of revenue by appliance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appliance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage (hrs)</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliances.map((appliance) => (
                <TableRow key={appliance.name}>
                  <TableCell className="font-medium">{appliance.name}</TableCell>
                  <TableCell>
                    <Badge variant={appliance.status === "active" ? "default" : "outline"}>
                      {appliance.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{appliance.usage} hrs</TableCell>
                  <TableCell className="text-right">{formatCurrency(appliance.revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}