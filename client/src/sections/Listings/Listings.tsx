import React, {FunctionComponent} from "react"
import {useMutation, useQuery} from '../../lib/api'
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

  const {data, refetch, loading, error} = useQuery<ListingsData>(LISTINGS);
  const [deleteListing, {
    loading: deleteLoading,
    error: deleteError
  }] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTINGS);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ id });
    refetch();
  }

  const listings = data ? data.listings : null;

  const listingsList = listings ? (<ul>
    {
      listings.map((listing) => {
        return <li key={listing.id}>
          {listing.title}
          <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
        </li>
      })
    }
  </ul>) : null;

  const deleteListingLoadingMessage =
    deleteLoading ? <h4>Deletion in progress...</h4> : null;

  const deleteListingErrorMessage =
    deleteError ? <h4>Deletion error!</h4> : null;

  if (loading) {
    return <h2>Loading ...</h2>
  } if (error) {
    return <h2>Oh no! Something went wrong - loease try again later :(</h2>
  } else {
    return (
      <div>
        <h2>{title}</h2>
        {listingsList}
        {deleteListingLoadingMessage}
        {deleteListingErrorMessage}
      </div>
    )
  }
}


