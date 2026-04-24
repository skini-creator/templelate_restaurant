"use client"

import { useState } from "react"
import { QrCode } from "lucide-react"
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function QRCodeCanvas({ tableNumber, baseUrl }: { tableNumber: string; baseUrl: string }) {
  // Construction de l'URL finale pour la table
  const url = `${baseUrl}?table=${tableNumber}`

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Vrai QR Code scannable */}
      <div className="bg-white p-4 rounded-2xl border-2 border-border shadow-sm flex items-center justify-center">
        <QRCodeSVG 
          value={url}
          size={180}
          level={"H"} // Haute tolérance aux erreurs pour l'impression
          includeMargin={false}
        />
      </div>
      
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-wider">
          Table {tableNumber}
        </p>
        <p className="text-[10px] text-muted-foreground truncate max-w-[140px] mt-1">
          {url}
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-[10px] h-7"
        onClick={() => window.open(url, '_blank')}
      >
        Tester le lien
      </Button>
    </div>
  )
}

export default function QRCodeGeneratorPage() {
  // L'URL de base de ton projet Vercel
  const [baseUrl, setBaseUrl] = useState("https://templelate-restaurant.vercel.app")
  const [tableCount, setTableCount] = useState(15)

  return (
    <div className="container mx-auto py-10 max-w-5xl px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-primary/10">
          <QrCode className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Générateur de QR Codes</h1>
          <p className="text-muted-foreground">Outil de déploiement pour restaurants (Gabon)</p>
        </div>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="generator">Visualiser les QR Codes</TabsTrigger>
          <TabsTrigger value="settings">Configuration & Impression</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grille des Tables</CardTitle>
              <CardDescription>
                Vérifiez que chaque QR code pointe vers la bonne table avant d'imprimer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: tableCount }, (_, i) => i + 1).map((table) => (
                  <div key={table} className="flex flex-col items-center p-6 border rounded-2xl bg-card hover:border-primary/50 transition-colors">
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
              <CardTitle>Paramètres de l'établissement</CardTitle>
              <CardDescription>
                Configurez l'URL de production et le nombre de tables du client.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="baseUrl">URL de destination (Vercel)</Label>
                <Input
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://votre-projet.vercel.app"
                />
                <p className="text-[12px] text-yellow-600 bg-yellow-50 p-2 rounded">
                  ⚠️ Assurez-vous que l'URL ne finit pas par un "/"
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tableCount">Nombre de tables à générer</Label>
                <Input
                  id="tableCount"
                  type="number"
                  min="1"
                  max="100"
                  value={tableCount}
                  onChange={(e) => setTableCount(Number(e.target.value))}
                />
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full md:w-auto" onClick={() => window.print()}>
                  Lancer l'impression (PDF)
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Astuce : Utilisez "Enregistrer au format PDF" pour envoyer le fichier à l'imprimeur.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}