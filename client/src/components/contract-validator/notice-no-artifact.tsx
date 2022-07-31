function NoticeNoArtifact({ contract }: { contract: string }) {
  return (
    <p>
      ⚠️ Cannot find <span className="code">{contract}</span> contract artifact. Please complete the above preparation
      first, then restart the react dev server.
    </p>
  );
}

export default NoticeNoArtifact;
