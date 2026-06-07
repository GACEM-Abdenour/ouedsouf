import { Card, CardContent } from "@/components/ui/card"

export function AdminTable({ title, rows }: { title: string; rows: Array<Record<string, string>> }) {
  const keys = rows[0] ? Object.keys(rows[0]) : []
  return (
    <Card className="rounded-lg border-primary/10">
      <CardContent className="overflow-x-auto">
        <h2 className="mb-4 text-2xl font-serif text-primary">{title}</h2>
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              {keys.map((key) => <th key={key} className="py-2 font-medium capitalize">{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b last:border-0">
                {keys.map((key) => <td key={key} className="py-3">{row[key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
