"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign } from "lucide-react";

export default function MatchPage() {
  const [query, setQuery] = useState("");
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInvestors = async () => {
    setLoading(true);
    setError("");
    setInvestors([]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Failed to fetch investors");

      const data = await response.json(); // ✅ Await JSON response properly

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid response format");
      }

      // ✅ Extract only important details from the "results" array
      const formattedInvestors = data.results.map((item: any) => ({
        investee: item.funded_organization_identifier?.value || "Unknown Investee",
        amountRaised: item.money_raised?.value_usd
          ? `$${(item.money_raised.value_usd / 1_000_000).toFixed(1)}M`
          : "N/A",
        investors: (item.investor_identifiers || []).map((inv: any) => inv.value).join(", ") || "Unknown Investors",
        investmentType: item.investment_type || "N/A",
        date: item.announced_on || "Unknown Date",
      }));

      setInvestors(formattedInvestors);
    } catch (err) {
      setError("Error fetching investors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investor Matching</h1>
      </div>

      <div className="flex gap-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter your target market to match with investors"
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button onClick={fetchInvestors} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investors.length > 0 ? (
          investors.map((investor, index) => (
            <Card key={index} className="p-4 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{investor.investee}</span>
                  <Badge>{investor.investmentType}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                  <span>Amount Raised: {investor.amountRaised}</span>
                </div>
                <p className="text-sm text-gray-700">Investors: {investor.investors}</p>
                <p className="text-xs text-gray-500">Date: {investor.date}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No investors found</p>
        )}
      </div>
    </div>
  );
}
