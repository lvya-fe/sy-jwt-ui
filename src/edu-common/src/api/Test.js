import { get, post, url} from '../index'

class Test {
  // 测试
  @url("/app/tea/task/taskView")
  @get
  taskView() {}

}

export default new Test()
