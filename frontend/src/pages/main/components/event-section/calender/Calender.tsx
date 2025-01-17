import crayon from '@/assets/crayon.svg'

interface CalendarProps {
  months: string[]
  events: string[][]
}

export const Calendar = ({ months, events }: CalendarProps) => {
  return (
    <div className="relative w-full">
      <img
        src={crayon}
        alt="crayon"
        width={100}
        className="absolute -top-7 left-[calc(68%)] z-10"
      />
      <p className="absolute -top-10 left-[calc(72%)] z-10 text-base font-semibold text-red-400 lg:text-lg">
        해커톤
      </p>
      <table className="md:text-md w-full table-fixed border-collapse overflow-hidden break-keep rounded-xl border border-gray-300 text-sm">
        <thead className="bg-primary text-white">
          <tr>
            {months.map((month, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((event, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                  {event}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
