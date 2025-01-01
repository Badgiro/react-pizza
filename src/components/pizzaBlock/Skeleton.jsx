import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#d9d9d9"
    foregroundColor="#d4ded6"
    {...props}
  >
    <circle cx="141" cy="140" r="140" /> 
    <rect x="0" y="290" rx="8" ry="8" width="280" height="27" /> 
    <rect x="3" y="323" rx="21" ry="21" width="280" height="88" /> 
    <rect x="11" y="424" rx="8" ry="8" width="100" height="40" /> 
    <rect x="160" y="423" rx="8" ry="8" width="120" height="40" />
  </ContentLoader>
)

export default Skeleton

