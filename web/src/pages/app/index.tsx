import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { withApollo } from "../../lib/withApollo";
import { useGetProductsQuery, useMeQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/page";

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div className="text-violet-500">
      <h1>Hello World!</h1>
      <pre>
        {JSON.stringify(me, null, 2)}
      </pre>

      {/* <pre>
        {JSON.stringify(data.products, null, 2)}
      </pre> */}

      <pre>{JSON.stringify(user, null, 2)}</pre>      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {    
    // getServerPageGetProducts({}, ctx);
    return {
      props: {}
    }      
  }
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);