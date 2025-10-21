import React from 'react'

const DiaryList = () => {
  const diaries = [
    {
      id: 1,
      title: '日記1',
      content: '日記1の内容',
    },
    {
      id: 2,
      title: '日記2',
      content: '日記2の内容',
    },
  ]
  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.title}</h2>
          <p>{diary.content}</p>
        </div>
      ))}
    </div>
  )
}

export default DiaryList
