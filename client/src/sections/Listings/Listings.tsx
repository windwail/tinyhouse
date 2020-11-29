import React, {FunctionComponent} from "react"
import {server} from '../../lib/api'
import {ListingsData} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

interface Props {
  title: string
}

export const Listings: FunctionComponent<Props> = ({title}: Props) => {
  const fetchListings = async () => {
    const {data} = await server.fetch<ListingsData>({query: LISTINGS});
    console.log(data.listings[0].address)
    console.log(data.listings[1].address)
  }
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
    </div>
  )
}

