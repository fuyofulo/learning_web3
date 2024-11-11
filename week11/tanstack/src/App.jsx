import { useEffect, useState } from 'react'
import './App.css';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

async function getter() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const response = await data.json();
  return response;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  )
}

function Posts () {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({ queryKey: ['posts'], queryFn: getter, refetchInterval: 10*1000 })

  if(error) {
    return <div>
      Error while fetching
    </div>
  }
  
  if(isLoading) {
    return "Loading..."
  }

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default App
