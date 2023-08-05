import { viteMockServe } from 'vite-plugin-mock'

export default function createMock(env: { VITE_MOCK_lOGGER: string }) {
  return viteMockServe({
    logger: env.VITE_MOCK_lOGGER === 'true',
    mockPath: 'src/mock/',
  })
}
