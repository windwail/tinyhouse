import {IResolvers} from 'apollo-server-express'
import {Database, Listing} from "../lib/types";
import {ObjectId} from 'mongodb';


export const resolvers: IResolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listings: async (
      _root: undefined,
      _args: undefined,
      {db}: { db: Database })
      : Promise<Listing[]> =>
    {
      // throw new Error("Error!");
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      {id}: { id: string },
      {db}: { db: Database }
    ): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if(!deleteRes.value) {
        throw new Error("Failed to delete listing");
      }

      return deleteRes.value;
    }
  },
  Listing: {
    // trivial resolvers here!
    id: (listing: Listing):string => listing._id.toString()
  }
}
