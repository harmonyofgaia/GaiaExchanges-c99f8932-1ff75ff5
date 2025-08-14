import { CommunityContract } from "@/components/CommunityContract";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Community Reinvestment Projects
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Join our sustainable community initiatives • Sign contracts for green projects • Make a
            difference
          </p>
          <p className="text-sm text-green-400 mt-2">
            🌱 Managed by Culture of Harmony • Fully transparent • Community driven
          </p>
        </div>

        <CommunityContract />
      </div>
    </div>
  );
};

export default Community;
