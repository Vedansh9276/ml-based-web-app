import { Activity, Brain, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Advanced Neural Imaging",
      description: "State-of-the-art technology for precise brain visualization and analysis.",
    },
    {
      icon: Shield,
      title: "Safe & Non-Invasive",
      description: "Completely safe scanning process with no radiation exposure.",
    },
    {
      icon: Clock,
      title: "Quick Results",
      description: "Receive comprehensive results within 24 hours of your scan.",
    },
    {
      icon: Activity,
      title: "Continuous Monitoring",
      description: "Track your brain health progress with regular wellness scans.",
    },
  ]

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Neurosketch?</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Experience the most advanced brain wellness scanning technology with our comprehensive suite of services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

