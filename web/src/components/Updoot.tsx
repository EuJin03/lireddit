import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootProps {
  post: PostSnippetFragment;
}

export const Updoot: React.FC<UpdootProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" mr="4">
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        aria-label="upvote"
        size="sm"
        mb={1}
        isLoading={loadingState === "updoot-loading"}
        icon={<ChevronUpIcon />}
      />

      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downvote"
        size="sm"
        mt={1}
        isLoading={loadingState === "downdoot-loading"}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};

export default Updoot;

// (operation?.variables as VoteMutationVariables)?.value === -1;
