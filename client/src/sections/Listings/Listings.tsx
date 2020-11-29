import React, {FunctionComponent, useEffect, useState} from "react"
import {server, useQuery} from '../../lib/api'
import {DeleteListingData, DeleteListingVariables, Listing, ListingsData} from "./types";

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

  const {data, refetch, loading, error} = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    const {data} = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTINGS,
      variables: {
        id
      }
    });
    refetch();
    console.log(data);
  }

  const listings = data ? data.listings : null;

  const listingsList = listings ? (<ul>
    {
      listings.map((listing) => {
        return <li key={listing.id}>
          {listing.title}
          <button onClick={() => deleteListing(listing.id)}>Delete</button>
        </li>
      })
    }
  </ul>) : null;

  if (loading) {
    return <h2>Loading ...</h2>
  } if (error) {
    return <h2>Oh no! Something went wrong - loease try again later :(</h2>
  } else {
    return (
      <div>
        <h2>{title}</h2>
        {listingsList}
      </div>
    )
  }
}


