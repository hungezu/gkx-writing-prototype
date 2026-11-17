import type { ReactNode } from 'react';
const img = `${import.meta.env.BASE_URL}figma/img.svg`;
const imgEditObliqueLine = `${import.meta.env.BASE_URL}figma/imgEditObliqueLine.svg`;
const imgImage1 = `${import.meta.env.BASE_URL}figma/imgImage1.png`;
const imgGroup2363 = `${import.meta.env.BASE_URL}figma/imgGroup2363.svg`;
const imgReport = `${import.meta.env.BASE_URL}figma/imgReport.svg`;
const imgNewReport = `${import.meta.env.BASE_URL}figma/imgNewReport.svg`;
const imgOpenFolder = `${import.meta.env.BASE_URL}figma/imgOpenFolder.svg`;
const imgFrame = `${import.meta.env.BASE_URL}figma/imgFrame.svg`;
const imgEllipse14300 = `${import.meta.env.BASE_URL}figma/imgEllipse14300.svg`;
const imgEllipse14301 = `${import.meta.env.BASE_URL}figma/imgEllipse14301.svg`;
const imgGroup2362 = `${import.meta.env.BASE_URL}figma/imgGroup2362.svg`;
const img1 = `${import.meta.env.BASE_URL}figma/img1.svg`;
const imgGroup = `${import.meta.env.BASE_URL}figma/imgGroup.svg`;
const imgEllipse14299 = `${import.meta.env.BASE_URL}figma/imgEllipse14299.svg`;
const imgEllipse1 = `${import.meta.env.BASE_URL}figma/imgEllipse1.svg`;
const imgDirectionCaretDown = `${import.meta.env.BASE_URL}figma/imgDirectionCaretDown.svg`;
const imgClosedFolder = `${import.meta.env.BASE_URL}figma/imgClosedFolder.svg`;
const img2 = `${import.meta.env.BASE_URL}figma/img2.svg`;
const imgSkillPuzzle = `${import.meta.env.BASE_URL}figma/imgSkillPuzzle.svg`;
const imgTemplateLayout = `${import.meta.env.BASE_URL}figma/imgTemplateLayout.svg`;
const imgUpwardArrow = `${import.meta.env.BASE_URL}figma/imgUpwardArrow.svg`;

function Component({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[16px]"} data-node-id="1:38" data-name="图标资产/方向/下">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
    </div>
  );
}

type ComponentsSeparatorProps = {
  className?: string;
  propValue?: "斜杠分隔符";
};

function ComponentsSeparator({ className, propValue = "斜杠分隔符" }: ComponentsSeparatorProps) {
  return (
    <div className={className || "content-stretch flex items-center overflow-clip relative"} data-node-id="1:3">
      <div className="relative shrink-0 size-[12px]" data-node-id="1:4" data-name="edit/oblique-line">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEditObliqueLine} />
      </div>
    </div>
  );
}


export interface ViewProps {
  onAction: (action: string, value?: string) => void;
  prompt: string; setPrompt: (value: string) => void;
  model: string; reportType: string; project: string;
  category: string; library: string; projectMode: string;
  collapsed: boolean; closedGroups: string[]; selectedReport: string; resourceFeedback?: ReactNode;
}
export default function FigmaPage({onAction, prompt, setPrompt, model, reportType, project, category, library, projectMode, collapsed, closedGroups, selectedReport, resourceFeedback}: ViewProps) {
  return (
    <div className="bg-[#d8e7fc] relative size-full" data-node-id="1:60" data-name="高端智库" data-collapsed={collapsed} data-project-mode={projectMode}>
      <main className="absolute backdrop-blur-[8px] bg-[rgba(255,255,255,0.48)] border border-solid border-white content-stretch flex flex-col gap-[12px] h-[903px] items-start left-[200px] pb-[16px] pt-[12px] px-[16px] rounded-[8px] top-[61px] w-[1704px]" data-node-id="1:61">
        <div className="content-stretch flex gap-[2px] items-center py-px relative shrink-0" data-node-id="1:62" data-name="breadcrumb">
          <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#86909c] text-[12px] whitespace-nowrap" data-node-id="1:63">
            智能创作报告
          </p>
          <ComponentsSeparator className="content-stretch flex items-center overflow-clip relative shrink-0" />
          <p className="[word-break:break-word] font-medium leading-[20px] not-italic relative shrink-0 text-[#4e5969] text-[12px] whitespace-nowrap" data-node-id="1:66">
            案例广场
          </p>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:67">
          <div className="bg-[rgba(255,255,255,0.48)] border-[#e5e6eb] border-r border-solid col-1 h-[839px] ml-0 mt-0 relative rounded-bl-[8px] rounded-tl-[8px] row-1 w-[1670px]" data-node-id="1:68" />
          <div className="bg-white border-[#e5e6eb] border-r border-solid col-1 h-[839px] ml-[248px] mt-0 relative rounded-[8px] row-1 w-[1422px]" data-node-id="1:69" />
          <div className="col-1 content-stretch flex flex-col gap-[24px] items-start ml-[359px] mt-[458px] relative row-1 w-[1200px]" data-node-id="7:100">
            <div className="[word-break:break-word] content-stretch flex font-medium gap-[24px] items-center leading-[24px] not-italic relative shrink-0 text-[16px] whitespace-nowrap" data-node-id="7:67">
              <button type="button" onClick={() => onAction("library", "技能广场")} aria-pressed={library === "技能广场"} className="relative shrink-0 text-[#1d2129]" data-node-id="7:64">
                技能广场
              </button>
              <button type="button" onClick={() => onAction("library", "知识库")} aria-pressed={library === "知识库"} className="relative shrink-0 text-[#4e5969]" data-node-id="7:65">
                知识库
              </button>
            </div>
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-node-id="7:75">
              <button type="button" onClick={() => onAction("category", "全部")} aria-pressed={category === "全部"} className="bg-[#f2f3f5] content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:69">
                <p className="[word-break:break-word] font-medium leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:68">
                  全部
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "战略分析")} aria-pressed={category === "战略分析"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:72">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:73">
                  战略分析
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "产业研究")} aria-pressed={category === "产业研究"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:82">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:83">
                  产业研究
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "技术研判")} aria-pressed={category === "技术研判"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:85">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:86">
                  技术研判
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "政策分析")} aria-pressed={category === "政策分析"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:88">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:89">
                  政策分析
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "证据核验")} aria-pressed={category === "证据核验"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:91">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:92">
                  证据核验
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "观点论证")} aria-pressed={category === "观点论证"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:94">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:95">
                  观点论证
                </p>
              </button>
              <button type="button" onClick={() => onAction("category", "报告写作")} aria-pressed={category === "报告写作"} className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[80px] shrink-0" data-node-id="7:97">
                <p className="[word-break:break-word] font-normal leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="7:98">
                  报告写作
                </p>
              </button>
            </div>
          {resourceFeedback}</div>
          <button type="button" onClick={() => onAction("collapse", "")} aria-label={collapsed ? "展开写作项目" : "收起写作项目"} aria-expanded={!collapsed} className="col-1 ml-[264px] mt-[16px] relative row-1 size-[24px]" data-node-id="1:70">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2363} />
          </button>
          <aside className="col-1 content-stretch flex flex-col gap-[8px] items-start ml-[16px] mt-[16px] relative row-1 w-[216px]" data-node-id="1:82">
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:83">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:84">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="1:85">
                  <p className="[word-break:break-word] font-medium leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] whitespace-nowrap" data-node-id="1:86">
                    写作项目
                  </p>
                </div>
                <div className="bg-[#f2f3f5] content-stretch flex h-[32px] items-center pl-[3px] py-[3px] relative rounded-[2px] shrink-0" data-node-id="1:88" data-name="按钮样式">
                  <button type="button" onClick={() => onAction("projectMode", "项目")} aria-pressed={projectMode === "项目"} className="bg-white content-stretch flex items-center justify-center px-[12px] py-[2px] relative rounded-[2px] shrink-0" data-node-id="I1:88;1736:167" data-name="单选框/按钮类型">
                    <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="I1:88;1736:167;1736:154">
                      <p className="leading-[22px]">项目</p>
                    </div>
                  </button>
                  <button type="button" onClick={() => onAction("projectMode", "最近")} aria-pressed={projectMode === "最近"} className="content-stretch flex items-center justify-center px-[12px] py-[2px] relative rounded-[2px] shrink-0" data-node-id="I1:88;1736:170" data-name="单选框/按钮类型">
                    <div className="[word-break:break-word] flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e5969] text-[14px] whitespace-nowrap" data-node-id="I1:88;1736:170;1736:159">
                      <p className="leading-[22px]">最近</p>
                    </div>
                  </button>
                </div>
              </div>
              <button type="button" onClick={() => onAction("newReport", "")}  className="content-stretch flex gap-[8px] items-center px-[4px] py-[5px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:89">
                <div className="relative shrink-0 size-[16px]" data-node-id="1:90" data-name="新建写作报告">
                  <div className="absolute left-0 size-[16px] top-0" data-node-id="1:91" data-name="写作报告 / 图标">
                    <div className="absolute left-0 overflow-clip size-[16px] top-0" data-node-id="1:92" data-name="Frame">
                      <div className="absolute inset-[10%_20%_12.5%_17.5%]" data-node-id="1:93" data-name="report">
                        <div className="absolute inset-[-4.84%_-6%]">
                          <img alt="" className="block max-w-none size-full" src={imgReport} />
                        </div>
                      </div>
                      <div className="absolute inset-[65%_12.5%_10%_62.5%]" data-node-id="1:97" data-name="new-report">
                        <div className="absolute inset-[-15%]">
                          <img alt="" className="block max-w-none size-full" src={imgNewReport} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:99">
                  新建报告
                </p>
              </button>
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:100">
              <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full" data-node-id="1:101" data-closed={closedGroups.includes("低空经济战略研究")}>
                <button type="button" onClick={() => onAction("group", "低空经济战略研究")} aria-expanded={!closedGroups.includes("低空经济战略研究")} className="content-stretch flex gap-[8px] items-center leading-[0] px-[4px] py-[5px] relative shrink-0 w-full" data-node-id="1:102">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:103" data-name="打开的文件夹">
                    <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[16px]" data-node-id="1:104" data-name="Frame">
                      <div className="absolute inset-[17.19%_8.98%_20.31%_9.38%]" data-node-id="1:105" data-name="open-folder">
                        <div className="absolute inset-[-6.25%_-4.78%]">
                          <img alt="" className="block max-w-none size-full" src={imgOpenFolder} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-normal justify-center not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:108">
                    <p className="leading-[22px]">低空经济战略研究</p>
                  </div>
                </button>
                <button type="button" onClick={() => onAction("report", "1:109")} aria-pressed={selectedReport === "1:109"} data-report="true" className="bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pr-[16px] pt-[5px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:109">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:110">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">深圳低空经济产业链战略研</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:111">
                    <div className="bg-[#f2f3f5] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:112" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:112;1907:7768">
                        战略分析报告
                      </p>
                    </div>
                    <div className="relative shrink-0 size-[16px]" data-node-id="1:113" data-name="Frame">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame} />
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-l from-white h-[22px] left-[176px] to-[rgba(255,255,255,0)] top-[5px] via-[49.85%] via-white w-[40px]" data-node-id="1:117" />
                  <div className="absolute left-[208px] size-[8px] top-0" data-node-id="1:118">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse14300} />
                  </div>
                </button>
                <button type="button" onClick={() => onAction("report", "1:119")} aria-pressed={selectedReport === "1:119"} data-report="true" className="content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pt-[5px] relative shrink-0 w-full" data-node-id="1:119">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:120">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">大湾区低空经济区域竞争比较</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:121">
                    <div className="bg-white content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:122" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:122;1907:7768">
                        研究报告
                      </p>
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-l from-[#f5f9fe] h-[22px] left-[200px] to-[rgba(245,249,254,0)] top-[5px] via-[#f5f9fe] via-[49.85%] w-[16px]" data-node-id="1:127" />
                </button>
                <button type="button" onClick={() => onAction("report", "1:128")} aria-pressed={selectedReport === "1:128"} data-report="true" className="content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pt-[5px] relative rounded-[8px] shrink-0 w-full" data-node-id="1:128">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:129">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">低空飞行服务重点企业筛选</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:130">
                    <div className="bg-white content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:131" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:131;1907:7768">
                        洞察报告
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-[6px] size-[14px] top-[9px]" data-node-id="1:300">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse14301} />
                  </div>
                </button>
              </div>
              <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full" data-node-id="1:136" data-closed={closedGroups.includes("新兴产业布局")}>
                <button type="button" onClick={() => onAction("group", "新兴产业布局")} aria-expanded={!closedGroups.includes("新兴产业布局")} className="content-stretch flex gap-[8px] items-center leading-[0] px-[4px] py-[5px] relative shrink-0 w-full" data-node-id="1:137">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:138" data-name="打开的文件夹">
                    <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[16px]" data-node-id="1:139" data-name="Frame">
                      <div className="absolute inset-[17.19%_8.98%_20.31%_9.38%]" data-node-id="1:140" data-name="open-folder">
                        <div className="absolute inset-[-6.25%_-4.78%]">
                          <img alt="" className="block max-w-none size-full" src={imgOpenFolder} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-normal justify-center not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:143">
                    <p className="leading-[22px]">新兴产业布局</p>
                  </div>
                </button>
                <button type="button" onClick={() => onAction("report", "1:144")} aria-pressed={selectedReport === "1:144"} data-report="true" className="content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pt-[5px] relative shrink-0 w-full" data-node-id="1:144">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:145">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">未来产业方向优先级分析</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:146">
                    <div className="bg-white content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:147" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:147;1907:7768">
                        战略分析报告
                      </p>
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-l from-[#f5f9fe] h-[22px] left-[200px] to-[rgba(245,249,254,0)] top-[5px] via-[#f5f9fe] via-[49.85%] w-[16px]" data-node-id="1:152" />
                </button>
                <button type="button" onClick={() => onAction("report", "1:153")} aria-pressed={selectedReport === "1:153"} data-report="true" className="content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pt-[5px] relative shrink-0 w-full" data-node-id="1:153">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:154">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">具身智能产业发展趋势研判</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:155">
                    <div className="bg-white content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:156" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:156;1907:7768">
                        洞察报告
                      </p>
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-l from-[#f5f9fe] h-[22px] left-[200px] to-[rgba(245,249,254,0)] top-[5px] via-[#f5f9fe] via-[49.85%] w-[16px]" data-node-id="1:161" />
                </button>
              </div>
              <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full" data-node-id="1:271" data-closed={closedGroups.includes("独立报告")}>
                <button type="button" onClick={() => onAction("group", "独立报告")} aria-expanded={!closedGroups.includes("独立报告")} className="content-stretch flex gap-[8px] items-center leading-[0] px-[4px] py-[5px] relative shrink-0 w-full" data-node-id="1:272">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:273" data-name="打开的文件夹">
                    <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[16px]" data-node-id="1:274" data-name="Frame">
                      <div className="absolute inset-[17.19%_8.98%_20.31%_9.38%]" data-node-id="1:275" data-name="open-folder">
                        <div className="absolute inset-[-6.25%_-4.78%]">
                          <img alt="" className="block max-w-none size-full" src={imgOpenFolder} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-normal justify-center not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:278">
                    <p className="leading-[22px]">独立报告</p>
                  </div>
                </button>
                <button type="button" onClick={() => onAction("report", "1:279")} aria-pressed={selectedReport === "1:279"} data-report="true" className="content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pt-[5px] relative shrink-0 w-full" data-node-id="1:279">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:280">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">未来产业方向优先级分析</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:281">
                    <div className="bg-white content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:282" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:282;1907:7768">
                        战略分析报告
                      </p>
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-l from-[#f5f9fe] h-[22px] left-[200px] to-[rgba(245,249,254,0)] top-[5px] via-[#f5f9fe] via-[49.85%] w-[16px]" data-node-id="1:287" />
                </button>
                <button type="button" onClick={() => onAction("report", "1:288")} aria-pressed={selectedReport === "1:288"} data-report="true" className="content-stretch flex flex-col gap-[4px] items-start justify-center pb-[8px] pl-[28px] pt-[5px] relative shrink-0 w-full" data-node-id="1:288">
                  <div className="[word-break:break-word] flex flex-col font-normal h-[22px] justify-center leading-[0] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1d2129] text-[14px] text-ellipsis w-[min-content] whitespace-nowrap" data-node-id="1:289">
                    <p className="leading-[22px] overflow-hidden text-ellipsis">具身智能产业发展趋势研判</p>
                  </div>
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:290">
                    <div className="bg-white content-stretch flex items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="1:291" data-name="Tag 标签">
                      <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2129] text-[12px] whitespace-nowrap" data-node-id="I1:291;1907:7768">
                        洞察报告
                      </p>
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-l from-[#f5f9fe] h-[22px] left-[200px] to-[rgba(245,249,254,0)] top-[5px] via-[#f5f9fe] via-[49.85%] w-[16px]" data-node-id="1:296" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <header className="absolute content-stretch flex items-center justify-between left-0 px-[16px] top-0 w-[1920px]" data-node-id="1:162">
        <div className="content-stretch flex gap-[16px] h-[56px] items-center relative shrink-0" data-node-id="1:163">
          <div className="content-stretch flex gap-[8px] h-full items-center px-[2px] py-[6px] relative shrink-0" data-node-id="1:164">
            <div className="relative shrink-0 size-[28px]" data-node-id="1:165" data-name="image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
            <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-node-id="1:166">
              <p className="[word-break:break-word] font-medium leading-[24px] not-italic relative shrink-0 text-[#1d2129] text-[16px] w-full" data-node-id="1:167">
                深圳国际科技信息中心
              </p>
            </div>
          </div>
          <nav className="content-stretch flex gap-[4px] h-full items-center relative shrink-0 w-[584px]" data-node-id="1:168">
            <button type="button" onClick={() => onAction("navigation", "首页")}  className="content-stretch flex h-full items-center justify-center px-[8px] py-[9px] relative rounded-[2px] shrink-0 w-[88px]" data-node-id="1:169">
              <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:170">
                首页
              </p>
            </button>
            <button type="button" onClick={() => onAction("navigation", "科学研究")}  className="content-stretch flex h-full items-center justify-center px-[8px] py-[9px] relative rounded-[2px] shrink-0 w-[88px]" data-node-id="1:171">
              <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:172">
                科学研究
              </p>
            </button>
            <button type="button" onClick={() => onAction("navigation", "未来教育")}  className="content-stretch flex h-full items-center justify-center px-[8px] py-[9px] relative rounded-[2px] shrink-0 w-[88px]" data-node-id="1:173">
              <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:174">
                未来教育
              </p>
            </button>
            <button type="button" onClick={() => onAction("navigation", "科技评价")}  className="content-stretch flex h-full items-center justify-center px-[8px] py-[9px] relative rounded-[2px] shrink-0 w-[88px]" data-node-id="1:175">
              <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:176">
                科技评价
              </p>
            </button>
            <button type="button" onClick={() => onAction("navigation", "战略咨询")}  className="bg-gradient-to-b content-stretch flex flex-col from-[rgba(255,255,255,0.24)] gap-[4px] h-full items-center justify-center px-[8px] py-[9px] relative shrink-0 to-white w-[88px]" data-node-id="1:177">
              <p className="[word-break:break-word] font-medium leading-[22px] min-w-full not-italic relative shrink-0 text-[#165dff] text-[14px] text-center w-[min-content]" data-node-id="1:178">
                战略咨询
              </p>
              <div className="absolute bg-white h-[4px] left-0 top-0 w-[88px]" data-node-id="1:179" />
            </button>
            <button type="button" onClick={() => onAction("navigation", "应用管理")}  className="content-stretch flex h-full items-center justify-center px-[8px] py-[9px] relative rounded-[2px] shrink-0 w-[88px]" data-node-id="1:180">
              <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:181">
                应用管理
              </p>
            </button>
            <button type="button" onClick={() => onAction("navigation", "集群服务")}  className="content-stretch flex h-full items-center justify-center px-[8px] py-[9px] relative rounded-[2px] shrink-0 w-[88px]" data-node-id="1:182">
              <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:183">
                集群服务
              </p>
            </button>
          </nav>
        </div>
        <div className="flex flex-row items-center self-stretch" data-node-id="1:184">
          <div className="content-stretch flex gap-[16px] h-full items-center relative shrink-0">
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:185">
              <button type="button" onClick={() => onAction("utility", "工作台")}  className="content-stretch flex gap-[4px] items-center justify-center px-[11px] py-[6px] relative rounded-[22px] shrink-0" data-node-id="1:186">
                <div className="relative shrink-0 size-[20px]" data-node-id="1:187">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2362} />
                </div>
                <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#4e5969] text-[14px] text-center whitespace-nowrap" data-node-id="1:194">
                  工作台
                </p>
              </button>
              <button type="button" onClick={() => onAction("utility", "待办中心")}  className="content-stretch flex gap-[4px] items-center px-[11px] py-[6px] relative rounded-[22px] shrink-0" data-node-id="1:195">
                <div className="relative shrink-0 size-[20px]" data-node-id="1:196" data-name="待办清单">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1} />
                </div>
                <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#4e5969] text-[14px] text-center whitespace-nowrap" data-node-id="1:203">
                  待办中心
                </p>
              </button>
              <button type="button" onClick={() => onAction("utility", "消息中心")}  className="content-stretch flex gap-[4px] items-center px-[11px] py-[6px] relative rounded-[22px] shrink-0" data-node-id="1:204">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="1:205" data-name="图标资产/导航/消息中心">
                  <div className="absolute inset-[10%_19.42%_11.14%_20%]" data-node-id="I1:205;931:28" data-name="Group">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
                  </div>
                </div>
                <p className="[word-break:break-word] font-normal leading-[20px] not-italic relative shrink-0 text-[#4e5969] text-[14px] text-center whitespace-nowrap" data-node-id="1:206">
                  消息中心
                </p>
              </button>
            </div>
            <button type="button" onClick={() => onAction("utility", "李科")}  className="bg-[rgba(255,255,255,0.48)] content-stretch flex gap-[8px] items-center pl-[4px] pr-[8px] py-[4px] relative rounded-[30px] shrink-0" data-node-id="1:207">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:208">
                <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-node-id="1:209">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:210">
                    <div className="col-1 ml-0 mt-0 relative row-1 size-[32px]" data-node-id="1:211">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse14299} />
                    </div>
                    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="1:212">
                      <div className="col-1 ml-0 mt-0 relative row-1 size-[32px]" data-node-id="1:213">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
                      </div>
                      <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9px] mt-[5px] place-items-start relative row-1" data-node-id="1:214">
                        <p className="[word-break:break-word] col-1 font-medium leading-[22px] ml-0 mt-0 not-italic relative row-1 text-[14px] text-white whitespace-nowrap" data-node-id="1:215">
                          李
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:216">
                    <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:217">
                      李科
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 size-[12px]" data-node-id="1:218" data-name="direction/caret-down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDirectionCaretDown} />
              </div>
            </button>
          </div>
        </div>
      </header>
      <div className="absolute content-stretch flex flex-col gap-[28px] items-start leading-[0] left-[780px] top-[228px] w-[800px]" data-node-id="1:270">
        <div className="grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-node-id="1:76">
          <div className="[word-break:break-word] col-1 content-stretch flex flex-col gap-[8px] items-center justify-center ml-0 mt-0 not-italic relative row-1 w-full whitespace-nowrap" data-node-id="1:77">
            <p className="font-medium leading-[0] relative shrink-0 text-[#1d2129] text-[0px]" data-node-id="1:78">
              <span className="leading-[28px] text-[20px]">让每一项战略判断，都有</span>
              <span className="leading-[28px] text-[#165dff] text-[20px]">依据可循</span>
              <span className="font-normal leading-[28px] text-[#4e5969] text-[20px]">｜</span>
            </p>
            <p className="font-normal leading-[22px] relative shrink-0 text-[#86909c] text-[14px]" data-node-id="1:79">
              整合权威数据、系统分析结论与专业方法，支持可追溯、可审阅的战略报告创作
            </p>
          </div>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:269">
          <div className="bg-[#f2f3f5] col-1 content-stretch flex flex-col gap-[6px] items-start ml-0 mt-0 pb-[4px] pt-[6px] px-[4px] relative rounded-[16px] row-1 w-[800px]" data-node-id="7:26">
            <button type="button" onClick={() => onAction("project", "")}  className="content-stretch flex gap-[8px] items-center px-[8px] py-[3px] relative rounded-[8px] shrink-0" data-node-id="1:260">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:261" data-name="合上的文件夹">
                <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[16px]" data-node-id="1:262" data-name="Frame">
                  <div className="absolute inset-[13.44%_5.63%_10.31%_5.63%]" data-node-id="1:263" data-name="closed-folder">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClosedFolder} />
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col font-normal justify-center not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:267"><p className="leading-[22px]">{project}</p></div>
            </button>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:304">
              <div className="bg-white border border-[#e5e6eb] border-solid col-1 content-stretch flex flex-col h-[128px] items-start justify-between ml-0 mt-0 p-[12px] relative rounded-[12px] row-1 w-[792px]" data-node-id="7:25">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="7:63">
                  <button type="button" onClick={() => onAction("reportType", "")} aria-label="选择报告类型" className="bg-[#f2f3f5] content-stretch flex gap-[8px] items-center px-[8px] py-[2px] relative rounded-[var(--最小值,4px)] shrink-0" data-node-id="7:51" data-name="Tag 标签">
                    <p className="[word-break:break-word] font-normal leading-[22px] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="I7:51;1907:7757">{reportType}</p>
                    <div className="relative shrink-0 size-[14px]" data-node-id="I7:51;1907:7792" data-name="图标资产/方向/下">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={img2} />
                    </div>
                  </button>
                  <textarea data-node-id="7:62" aria-label="报告需求" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') onAction('send'); }} placeholder="示例：分析深圳低空经济产业链现状，识别未来三年值得重点布局的方向，并提出产业培育建议" rows={1} className="prompt-input font-normal leading-[22px] text-[#1d2129] text-[14px]" />
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-[768px]" data-node-id="1:334">
                  <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="1:333">
                    <button type="button" onClick={() => onAction("skills", "")}  className="content-stretch flex gap-[4px] items-center px-[4px] py-[3px] relative rounded-[8px] shrink-0" data-node-id="1:324">
                      <div className="relative shrink-0 size-[16px]" data-node-id="4:26" data-name="技能图标">
                        <div className="absolute left-0 size-[16px] top-0" data-node-id="6:26" data-name="Skill · 拼图">
                          <div className="absolute left-0 overflow-clip size-[16px] top-0" data-node-id="6:100" data-name="Frame">
                            <div className="absolute inset-[13.75%]" data-node-id="6:101" data-name="skill-puzzle">
                              <div className="absolute inset-[-5.17%]">
                                <img alt="" className="block max-w-none size-full" src={imgSkillPuzzle} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:320">
                        <p className="leading-[22px]">技能</p>
                      </div>
                    </button>
                    <button type="button" onClick={() => onAction("templates", "")}  className="content-stretch flex gap-[4px] items-center px-[4px] py-[3px] relative rounded-[8px] shrink-0" data-node-id="1:328">
                      <div className="relative shrink-0 size-[16px]" data-node-id="5:26" data-name="模板">
                        <div className="absolute left-0 overflow-clip size-[16px] top-0" data-node-id="5:44" data-name="Frame">
                          <div className="absolute inset-[11.88%]" data-node-id="5:45" data-name="template-layout">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTemplateLayout} />
                          </div>
                        </div>
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:330">
                        <p className="leading-[22px]">模板选择</p>
                      </div>
                    </button>
                  </div>
                  <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="1:313">
                    <button type="button" onClick={() => onAction("model", "")} aria-label="选择模型" className="content-stretch flex gap-[8px] items-center px-[4px] py-[3px] relative rounded-[8px] shrink-0" data-node-id="1:314">
                      <div className="[word-break:break-word] flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1d2129] text-[14px] whitespace-nowrap" data-node-id="1:315"><p className="leading-[22px]">{model}</p></div>
                      <Component className="relative shrink-0 size-[16px]" />
                    </button>
                    <button type="button" onClick={() => onAction("send", "")} aria-label="发送报告需求" className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="7:43">
                      <div className="bg-[#2a2a2a] col-1 ml-0 mt-0 relative rounded-[8px] row-1 size-[28px]" data-node-id="1:317" />
                      <div className="col-1 ml-[6px] mt-[6px] relative row-1 size-[16px]" data-node-id="8:52" data-name="发送 / 向上箭头">
                        <div className="absolute left-0 overflow-clip size-[16px] top-0" data-node-id="8:78" data-name="Frame">
                          <div className="absolute inset-[12.5%_18.75%]" data-node-id="8:81" data-name="upward-arrow">
                            <div className="absolute inset-[-6.67%_-8%]">
                              <img alt="" className="block max-w-none size-full" src={imgUpwardArrow} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
