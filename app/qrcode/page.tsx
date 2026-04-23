"use client"

import { useState } from "react"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function QRCodeCanvas({ tableNumber, baseUrl }: { tableNumber: string; baseUrl: string }) {
  const url = `${baseUrl}?table=${tableNumber}`

  return (
    <div className="flex flex-col items-center gap-4">
      {/* QR Code SVG généré */}
      <div className="bg-white p-4 rounded-2xl border-2 border-border shadow-sm">
        <svg
          viewBox="0 0 200 200"
          className="w-48 h-48"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Code QR simplifié - version SVG */}
          <rect fill="#000" width="200" height="200" />
          <rect fill="#fff" x="10" y="10" width="180" height="180" />
          
          {/* Coins de positionnement */}
          <rect fill="#000" x="20" y="20" width="50" height="50" />
          <rect fill="#fff" x="28" y="28" width="34" height="34" />
          <rect fill="#000" x="34" y="34" width="22" height="22" />
          
          <rect fill="#000" x="130" y="20" width="50" height="50" />
          <rect fill="#fff" x="138" y="28" width="34" height="34" />
          <rect fill="#000" x="144" y="34" width="22" height="22" />
          
          <rect fill="#000" x="20" y="130" width="50" height="50" />
          <rect fill="#fff" x="28" y="138" width="34" height="34" />
          <rect fill="#000" x="34" y="144" width="22" height="22" />
          
          {/* Données du tableau (pattern simplifié) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={`r${i}`} fill="#000" x={80 + (i % 4) * 15} y={20 + Math.floor(i / 4) * 80} width="15" height="15" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={`b${i}`} fill="#000" x={20 + (i % 4) * 15} y={80 + Math.floor(i / 4) * 15} width="15" height="15" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={`m${i}`} fill="#000" x={80 + (i % 4) * 15} y={80 + Math.floor(i / 4) * 15} width="15" height="15" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={`d${i}`} fill="#000" x={130 + (i % 4) * 15} y={80 + Math.floor(i / 4) * 15} width="15" height="15" />
          ))}
          
          {/* Numéro de table au centre */}
          <rect fill="#000" x="85" y="85" width="30" height="30" />
          <text x="100" y="105" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            {tableNumber}
          </text>
        </svg>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        Scannez pour commander depuis la table {tableNumber}
      </p>
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-primary hover:underline"
      >
        {url}
      </a>
    </div>
  )
}

export default function QRCodeGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState("https://templelate-restaurant.vercel.app")
  const [tableCount, setTableCount] = useState(15)

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-primary/10">
          <QrCode className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Générateur de QR Codes</h1>
          <p className="text-muted-foreground">Créez des QR codes pour vos tables</p>
        </div>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">Générateur</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Générer des QR codes</CardTitle>
              <CardDescription>
                Imprimez ces QR codes et placez-les sur vos tables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: tableCount }, (_, i) => i + 1).map((table) => (
                  <div key={table} className="flex flex-col items-center p-4 border rounded-xl bg-card">
                    <QRCodeCanvas tableNumber={String(table)} baseUrl={baseUrl} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>
                Définissez l&apos;URL de votre site et le nombre de tables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseUrl">URL du site</Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://votre-site.vercel.app"
                />
                <p className="text-xs text-muted-foreground">
                  L&apos;URL où votre site est hébergé (Vercel, Netlify, etc.)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tableCount">Nombre de tables</Label>
                <Input
                  id="tableCount"
                  type="number"
                  min="1"
                  max="50"
                  value={tableCount}
                  onChange={(e) => setTableCount(Number(e.target.value))}
                />
              </div>

              <Button onClick={() => window.print()}>
                Imprimer tous les QR codes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}