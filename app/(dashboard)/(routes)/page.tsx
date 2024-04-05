import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import HeroSection from './_components/hero-section'
import Customers from './_components/customers'
import Sections from './_components/sections'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Customers />
      <Sections />
    </>
  )
}
