import { useMemo } from "react";

interface HeatMapProps {
  heatmapData: {
    language: string;
    tool: string;
    count: number;
  }[];
}

const HeatMapToolLanguage = ({ heatmapData }: HeatMapProps) => {
  // Extract unique languages and tools to form the grid
  const languages = useMemo(
    () => Array.from(new Set(heatmapData.map((item) => item.language))),
    [heatmapData]
  );
  const tools = useMemo(
    () => Array.from(new Set(heatmapData.map((item) => item.tool))),
    [heatmapData]
  );

  // Build a matrix based on language and tool combinations
  const matrix = useMemo(() => {
    // Initialize the matrix with 0 for all language-tool combinations
    const initialMatrix = Object.fromEntries(
      languages.map((lang) => [
        lang,
        Object.fromEntries(tools.map((tool) => [tool, 0])),
      ])
    );

    // Fill the matrix with the actual data
    heatmapData.forEach((item) => {
      initialMatrix[item.language][item.tool] = item.count;
    });

    return initialMatrix;
  }, [heatmapData, languages, tools]);

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-[#4d4d4d] bg-secondary px-2 py-2 text-[#c1ff58] opacity-75">
              Language / Tool
            </th>
            {tools.map((tool) => (
              <th
                key={tool}
                className="border border-[#4d4d4d] bg-secondary px-4 py-2 font-light"
              >
                {tool}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {languages.map((lang) => (
            <tr key={lang}>
              <td className="border border-[#4d4d4d] bg-secondary px-4 py-2 font-light">
                {lang}
              </td>
              {tools.map((tool) => (
                <td
                  key={tool}
                  className={`border px-4 py-2 text-center text-sm`}
                  style={{
                    backgroundColor: `rgba(165, 250, 100, ${
                      matrix[lang][tool] / 4
                    }`,
                    color: matrix[lang][tool] > 5 ? "#f1f3ed" : "#333333", // Adjust text color
                  }}
                >
                  {matrix[lang][tool]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeatMapToolLanguage;
