import React, {FunctionComponent} from "react"
import {server} from '../../lib/api'
import {DeleteListingData, DeleteListingVariables, ListingsData} from "./types";

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
`;

const DELETE_LISTINGS = `
  mutation DeleteListing($id: ID!) {
    deleteListing (id: $id) {
      id
    }
  }
`;

interface Props {
  title: string
}

export const Listings: FunctionComponent<Props> = ({title}: Props) => {
  const fetchListings = async () => {
    const {data} = await server.fetch<ListingsData>({query: LISTINGS});
  }

  const deleteListing = async () => {
    const {data} = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTINGS,
      variables: {
        id: '5fc374ec30bcf056f377dff7'
      }
    });

    console.log(data);
  }

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
      <button onClick={deleteListing}>Delete Listings!</button>
    </div>
  )
}


