type FooterDetailData = {
  id: number
  label: string
  content: string
}

export const FooterDetail = () => {
  return (
    <div className="flex flex-col justify-start gap-2 text-sm">
      {footerDetailData.map((detail) => (
        <div key={detail.id} className="flex flex-row gap-4">
          <span className="whitespace-nowrap break-keep font-semibold">
            {detail.label}
          </span>
          <span className="break-keep">{detail.content}</span>
        </div>
      ))}
    </div>
  )
}

const footerDetailData: FooterDetailData[] = [
  {
    id: 0,
    label: '주소',
    content:
      '대구광역시 북구 대학로 80 (산격동, 경북대학교) IT대학 2호관 108호 (안쪽) (41566)',
  },
  {
    id: 1,
    label: '연락처',
    content: 'knu.haedal@gmail.com',
  },
]
