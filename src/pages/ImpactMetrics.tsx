import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts'
import { TreePine, Droplets, Wind, Recycle, Globe, Users, TrendingUp, Target } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function ImpactMetrics() {
  const [data, setData] = useState([
    { name: 'Forests', value: 400 },
    { name: 'Oceans', value: 300 },
    { name: 'Renewable Energy', value: 200 },
    { name: 'Recycling', value: 100 },
  ])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  const lineData = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📊 Impact Metrics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Visualize and analyze the environmental impact of GAiA initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bar Chart Card */}
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TreePine className="h-5 w-5 text-green-400" />
                Project Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4ade80" />
                  <XAxis dataKey="name" stroke="#a7f3d0" />
                  <YAxis stroke="#a7f3d0" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff' }} />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart Card */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Droplets className="h-5 w-5 text-blue-400" />
                Impact by Sector
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart Card */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wind className="h-5 w-5 text-purple-400" />
                Monthly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9333ea" />
                  <XAxis dataKey="name" stroke="#c084fc" />
                  <YAxis stroke="#c084fc" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff' }} />
                  <Line type="monotone" dataKey="pv" stroke="#c084fc" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#a855f7" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
