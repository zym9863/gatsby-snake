import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SnakeGame from "../components/SnakeGame"

const IndexPage: React.FC<PageProps> = () => {
  return <SnakeGame />
}

export default IndexPage

export const Head: HeadFC = () => <title>贪吃蛇游戏</title>
