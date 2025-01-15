'use client'
import { useState } from 'react'
import { NavCategory } from '@/types'
import { FolderIcon, BookmarkIcon, AcademicCapIcon, BeakerIcon, CodeBracketIcon, CommandLineIcon, CpuChipIcon, WrenchIcon, GlobeAltIcon, LinkIcon, DocumentIcon, DocumentTextIcon, CloudIcon, ServerIcon, ShieldCheckIcon, CubeIcon, RocketLaunchIcon, PuzzlePieceIcon, LightBulbIcon, FireIcon, HashtagIcon, QueueListIcon, WindowIcon, Square3Stack3DIcon, CircleStackIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, VideoCameraIcon, ArchiveBoxIcon, BoltIcon, BuildingLibraryIcon, CalculatorIcon, CalendarIcon, ChartBarIcon, ChatBubbleLeftIcon, ClockIcon, CloudArrowUpIcon, CogIcon, CurrencyDollarIcon, EnvelopeIcon, FilmIcon, FingerPrintIcon, GiftIcon, HeartIcon, HomeIcon, InboxIcon, KeyIcon, LanguageIcon, MapIcon, MegaphoneIcon, MicrophoneIcon, MusicalNoteIcon, NewspaperIcon, PaintBrushIcon, PhotoIcon, PrinterIcon, QrCodeIcon, QuestionMarkCircleIcon, RadioIcon, ScaleIcon, ShoppingBagIcon, ShoppingCartIcon, SignalIcon, SpeakerWaveIcon, StarIcon, SunIcon, TableCellsIcon, TagIcon, TicketIcon, TrophyIcon, TvIcon, UserGroupIcon, UserIcon, UsersIcon, WifiIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline'
import IconSelect from './IconSelect'

interface CategoryManagerProps {
  categories: NavCategory[]
  onAdd: (category: Omit<NavCategory, 'id'>) => void
  onUpdate: (category: NavCategory) => void
  onDelete: (id: string) => void
}

// 预定义图标列表
const iconOptions = [
  { name: 'FolderIcon', displayName: '文件夹', icon: FolderIcon },
  { name: 'BookmarkIcon', displayName: '书签', icon: BookmarkIcon },
  { name: 'AcademicCapIcon', displayName: '学习', icon: AcademicCapIcon },
  { name: 'BeakerIcon', displayName: '实验', icon: BeakerIcon },
  { name: 'CodeBracketIcon', displayName: '代码', icon: CodeBracketIcon },
  { name: 'CommandLineIcon', displayName: '命令行', icon: CommandLineIcon },
  { name: 'CpuChipIcon', displayName: '芯片', icon: CpuChipIcon },
  { name: 'WrenchIcon', displayName: '工具', icon: WrenchIcon },
  { name: 'GlobeAltIcon', displayName: '网络', icon: GlobeAltIcon },
  { name: 'LinkIcon', displayName: '链接', icon: LinkIcon },
  { name: 'DocumentIcon', displayName: '文档', icon: DocumentIcon },
  { name: 'DocumentTextIcon', displayName: '文本', icon: DocumentTextIcon },
  { name: 'CloudIcon', displayName: '云服务', icon: CloudIcon },
  { name: 'ServerIcon', displayName: '服务器', icon: ServerIcon },
  { name: 'ShieldCheckIcon', displayName: '安全', icon: ShieldCheckIcon },
  { name: 'CubeIcon', displayName: '资源', icon: CubeIcon },
  { name: 'RocketLaunchIcon', displayName: '发布', icon: RocketLaunchIcon },
  { name: 'PuzzlePieceIcon', displayName: '插件', icon: PuzzlePieceIcon },
  { name: 'LightBulbIcon', displayName: '创意', icon: LightBulbIcon },
  { name: 'FireIcon', displayName: '热门', icon: FireIcon },
  { name: 'HashtagIcon', displayName: '标签', icon: HashtagIcon },
  { name: 'QueueListIcon', displayName: '列表', icon: QueueListIcon },
  { name: 'WindowIcon', displayName: '窗口', icon: WindowIcon },
  { name: 'Square3Stack3DIcon', displayName: '应用', icon: Square3Stack3DIcon },
  { name: 'CircleStackIcon', displayName: '数据', icon: CircleStackIcon },
  { name: 'ComputerDesktopIcon', displayName: '桌面', icon: ComputerDesktopIcon },
  { name: 'DevicePhoneMobileIcon', displayName: '移动', icon: DevicePhoneMobileIcon },
  { name: 'VideoCameraIcon', displayName: '视频', icon: VideoCameraIcon },
  { name: 'ArchiveBoxIcon', displayName: '存档', icon: ArchiveBoxIcon },
  { name: 'BoltIcon', displayName: '闪电', icon: BoltIcon },
  { name: 'BuildingLibraryIcon', displayName: '图书馆', icon: BuildingLibraryIcon },
  { name: 'CalculatorIcon', displayName: '计算器', icon: CalculatorIcon },
  { name: 'CalendarIcon', displayName: '日历', icon: CalendarIcon },
  { name: 'ChartBarIcon', displayName: '图表', icon: ChartBarIcon },
  { name: 'ChatBubbleLeftIcon', displayName: '聊天', icon: ChatBubbleLeftIcon },
  { name: 'ClockIcon', displayName: '时钟', icon: ClockIcon },
  { name: 'CloudArrowUpIcon', displayName: '云上传', icon: CloudArrowUpIcon },
  { name: 'CogIcon', displayName: '设置', icon: CogIcon },
  { name: 'CurrencyDollarIcon', displayName: '金融', icon: CurrencyDollarIcon },
  { name: 'EnvelopeIcon', displayName: '邮件', icon: EnvelopeIcon },
  { name: 'FilmIcon', displayName: '电影', icon: FilmIcon },
  { name: 'FingerPrintIcon', displayName: '指纹', icon: FingerPrintIcon },
  { name: 'GiftIcon', displayName: '礼物', icon: GiftIcon },
  { name: 'HeartIcon', displayName: '喜爱', icon: HeartIcon },
  { name: 'HomeIcon', displayName: '主页', icon: HomeIcon },
  { name: 'InboxIcon', displayName: '收件箱', icon: InboxIcon },
  { name: 'KeyIcon', displayName: '密钥', icon: KeyIcon },
  { name: 'LanguageIcon', displayName: '语言', icon: LanguageIcon },
  { name: 'MapIcon', displayName: '地图', icon: MapIcon },
  { name: 'MegaphoneIcon', displayName: '公告', icon: MegaphoneIcon },
  { name: 'MicrophoneIcon', displayName: '麦克风', icon: MicrophoneIcon },
  { name: 'MusicalNoteIcon', displayName: '音乐', icon: MusicalNoteIcon },
  { name: 'NewspaperIcon', displayName: '新闻', icon: NewspaperIcon },
  { name: 'PaintBrushIcon', displayName: '设计', icon: PaintBrushIcon },
  { name: 'PhotoIcon', displayName: '图片', icon: PhotoIcon },
  { name: 'PrinterIcon', displayName: '打印', icon: PrinterIcon },
  { name: 'QrCodeIcon', displayName: '二维码', icon: QrCodeIcon },
  { name: 'QuestionMarkCircleIcon', displayName: '帮助', icon: QuestionMarkCircleIcon },
  { name: 'RadioIcon', displayName: '广播', icon: RadioIcon },
  { name: 'ScaleIcon', displayName: '天平', icon: ScaleIcon },
  { name: 'ShoppingBagIcon', displayName: '购物袋', icon: ShoppingBagIcon },
  { name: 'ShoppingCartIcon', displayName: '购物车', icon: ShoppingCartIcon },
  { name: 'SignalIcon', displayName: '信号', icon: SignalIcon },
  { name: 'SpeakerWaveIcon', displayName: '扬声器', icon: SpeakerWaveIcon },
  { name: 'StarIcon', displayName: '星标', icon: StarIcon },
  { name: 'SunIcon', displayName: '太阳', icon: SunIcon },
  { name: 'TableCellsIcon', displayName: '表格', icon: TableCellsIcon },
  { name: 'TagIcon', displayName: '标签', icon: TagIcon },
  { name: 'TicketIcon', displayName: '票据', icon: TicketIcon },
  { name: 'TrophyIcon', displayName: '奖杯', icon: TrophyIcon },
  { name: 'TvIcon', displayName: '电视', icon: TvIcon },
  { name: 'UserGroupIcon', displayName: '用户组', icon: UserGroupIcon },
  { name: 'UserIcon', displayName: '用户', icon: UserIcon },
  { name: 'UsersIcon', displayName: '用户们', icon: UsersIcon },
  { name: 'WifiIcon', displayName: '无线', icon: WifiIcon },
  { name: 'WrenchScrewdriverIcon', displayName: '工具', icon: WrenchScrewdriverIcon },
  { name: 'XMarkIcon', displayName: '关闭', icon: XMarkIcon },
]

export default function CategoryManager({ 
  categories, 
  onAdd, 
  onUpdate, 
  onDelete 
}: CategoryManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: '', description: '', icon: 'FolderIcon' })
  const [editingCategory, setEditingCategory] = useState<NavCategory | null>(null)
  const [nameError, setNameError] = useState<string>('')

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault()
    
    const nameExists = categories.some(
      category => category.name.toLowerCase() === newCategory.name.toLowerCase()
    )
    
    if (nameExists) {
      setNameError('该分类名称已存在')
      return
    }
    
    setNameError('')
    onAdd({
      ...newCategory,
      icon: newCategory.icon || 'FolderIcon'
    })
    setNewCategory({ name: '', description: '', icon: 'FolderIcon' })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError('')
    setNewCategory({ ...newCategory, name: e.target.value })
  }

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      onUpdate(editingCategory)
      setEditingId(null)
      setEditingCategory(null)
    }
  }

  const startEdit = (category: NavCategory) => {
    setEditingId(category.id)
    setEditingCategory(category)
  }

  // 检查是否可以提交
  const canSubmit = newCategory.name.trim().length > 0

  return (
    <div className="space-y-6">
      {/* 添加新分类的表单 */}
      <div className="bg-white shadow rounded-lg p-6 max-w-3xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">添加新分类</h3>
        <form onSubmit={handleSubmitNew} className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
              <label htmlFor="new-name" className="block text-sm font-medium text-gray-700 mb-1">
                分类名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="new-name"
                className={`block w-full px-3 py-2 rounded-md border ${
                  nameError ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
                value={newCategory.name}
                onChange={handleNameChange}
                required
              />
              {nameError && (
                <p className="mt-1 text-sm text-red-600">
                  {nameError}
                </p>
              )}
            </div>
            <div className="col-span-3">
              <label htmlFor="new-description" className="block text-sm font-medium text-gray-700 mb-1">
                描述（选填）
              </label>
              <input
                type="text"
                id="new-description"
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="new-icon" className="block text-sm font-medium text-gray-700 mb-1">
                选择图标
              </label>
              <IconSelect
                value={newCategory.icon}
                onChange={(value) => setNewCategory({ ...newCategory, icon: value })}
                options={iconOptions}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                ${canSubmit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              添加分类
            </button>
          </div>
        </form>
      </div>

      {/* 分类列表 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                名称
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                图标
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                描述
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(category => (
              <tr key={category.id}>
                {editingId === category.id ? (
                  <td colSpan={4} className="px-6 py-4">
                    <form onSubmit={handleSubmitEdit} className="max-w-3xl mx-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-2">
                          <label htmlFor={`edit-name-${category.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            分类名称 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id={`edit-name-${category.id}`}
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={editingCategory?.name || ''}
                            onChange={(e) => setEditingCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                            required
                            autoFocus
                          />
                        </div>
                        <div className="col-span-3">
                          <label htmlFor={`edit-description-${category.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            描述（选填）
                          </label>
                          <input
                            type="text"
                            id={`edit-description-${category.id}`}
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={editingCategory?.description || ''}
                            onChange={(e) => setEditingCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                          />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor={`edit-icon-${category.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            选择图标
                          </label>
                          <IconSelect
                            value={editingCategory?.icon || 'FolderIcon'}
                            onChange={(value) => setEditingCategory(prev => 
                              prev ? { ...prev, icon: value } : null
                            )}
                            options={iconOptions}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null)
                            setEditingCategory(null)
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          取消
                        </button>
                        <button
                          type="submit"
                          disabled={!editingCategory?.name.trim()}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                            ${editingCategory?.name.trim() 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-gray-400 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          保存
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-36">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 w-32">
                      <div className="flex justify-center items-center">
                        {(() => {
                          const IconComponent = iconOptions.find(opt => 
                            opt.name === (category.icon || 'FolderIcon')
                          )?.icon || FolderIcon
                          return <IconComponent className="h-6 w-6 text-gray-600" />
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 w-1/2 break-words">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-32">
                      <button
                        onClick={() => startEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => onDelete(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 