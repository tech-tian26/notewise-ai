"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <Separator className="w-full" />
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={user?.name || ""} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={user?.email || ""} disabled />
          </div>
          <Button
            className="w-fit"
            onClick={() => toast.success("Profile updated!")}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <Separator className="w-full" />
        <CardContent className="flex flex-col gap-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Mode</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Toggle between light and dark theme
              </p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">AI Services</CardTitle>
          <CardDescription>
            Configure AI-powered features (mock mode)
          </CardDescription>
        </CardHeader>
        <Separator className="w-full" />
        <CardContent className="flex flex-col gap-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>OCR Processing</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Azure Computer Vision for handwriting recognition
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="w-full" />
          <div className="flex items-center justify-between">
            <div>
              <Label>Quiz Generation</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Azure OpenAI for generating quizzes from notes
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="w-full" />
          <div className="flex items-center justify-between">
            <div>
              <Label>Voice Q&A</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Speech-to-text and text-to-speech services
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
