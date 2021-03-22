import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import Layout from "../components/Layout";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Updoot from "../components/Updoot";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 20,
    cursor: null as string | null,
  });
  const [{ data, fetching, error }] = usePostsQuery({
    variables: {
      limit: 20,
    },
  });
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return (
      <>
        <div>your query failed to work for some reason</div>
        <div>{error}</div>
      </>
    );
  }

  return (
    <Layout variant="regular">
      {fetching && !data ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <Stack spacing={8}>
            {data?.posts.posts.map(p =>
              !p ? null : (
                <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                  <Updoot post={p} />
                  <Box flex="1">
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>

                    <Text>Posted by {p.creator.username}</Text>
                    <Flex>
                      <Text flex="1" mt={4}>
                        {p.textSnippet}
                      </Text>
                      {meData?.me?.id !== p.creator.id ? null : (
                        <Box ml="auto">
                          <NextLink
                            href="/post/edit/[id]"
                            as={`/post/edit/${p.id}`}
                          >
                            <IconButton
                              as={Link}
                              mr="4"
                              aria-label="edit post"
                              icon={<EditIcon />}
                            />
                          </NextLink>
                          <IconButton
                            onClick={() => {
                              deletePost({ id: p.id });
                            }}
                            aria-label="delete post"
                            icon={<DeleteIcon />}
                          />
                        </Box>
                      )}
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
          </Stack>
        </>
      )}

      {data && data.posts.hasMore ? (
        <Flex justifyContent="center">
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            my={8}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
// specifically enable ssr to remove rendering on client side
