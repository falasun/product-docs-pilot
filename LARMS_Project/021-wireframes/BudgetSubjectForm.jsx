
import React, { useState } from 'react';
import './BudgetSubjectForm.css';

const BudgetSubjectForm = () => {
  const [formData, setFormData] = useState({
    subjectCode: '',
    subjectName: '',
    parentSubject: '',
    description: '',
    defaultUnit: '',
    defaultPrice: '',
    formula: '',
    projectTypes: [],
    status: 'enabled'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        projectTypes: checked 
          ? [...prev.projectTypes, value]
          : prev.projectTypes.filter(type => type !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (action) => {
    console.log(`${action} clicked`, formData);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>新建预算科目</h1>
        <div className="header-actions">
          <button className="btn-secondary">返回列表</button>
          <button className="btn-close">×关闭</button>
        </div>
      </div>

      <form className="budget-form">
        <div className="form-group">
          <label className="required">
            科目编码:
            <input 
              type="text" 
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleInputChange}
              className="form-input"
            />
            <span className="help-icon">?</span>
          </label>
          <div className="form-hint">
            (提示：唯一标识符，格式：ANIM-类型-代码，示例：ANIM-MOUSE-C57)
          </div>
        </div>

        <div className="form-group">
          <label className="required">
            科目名称:
            <input 
              type="text" 
              name="subjectName"
              value={formData.subjectName}
              onChange={handleInputChange}
              className="form-input form-input-wide"
            />
          </label>
          <div className="form-hint">
            (用户友好名称，示例：C57BL/6J小鼠采购费)
          </div>
        </div>

        <div className="form-group">
          <label>
            上级科目:
            <select 
              name="parentSubject"
              value={formData.parentSubject}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">无</option>
              <option value="parent1">父科目1</option>
              <option value="parent2">父科目2</option>
            </select>
          </label>
          <div className="form-hint">
            (支持多级结构，选"无"则为一级科目)
          </div>
        </div>

        <div className="form-group">
          <label>
            科目描述:
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              rows="4"
            />
          </label>
          <div className="form-hint">
            (详细说明费用范围和核算规则，示例：含运输及初期检疫费)
          </div>
        </div>

        <div className="form-group">
          <label className="required">
            默认计费单位:
            <select 
              name="defaultUnit"
              value={formData.defaultUnit}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">选择</option>
              <option value="只">只</option>
              <option value="小时">小时</option>
              <option value="人天">人天</option>
              <option value="克">克</option>
              <option value="次">次</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            默认单价/费率:
            <div className="price-input">
              <span className="currency">¥</span>
              <input 
                type="number" 
                name="defaultPrice"
                value={formData.defaultPrice}
                onChange={handleInputChange}
                className="form-input"
                step="0.01"
              />
            </div>
          </label>
          <div className="form-hint">
            (数值型，保留2位小数；若需复杂计费请留空并配置"资源单价表")
          </div>
        </div>

        <div className="form-group">
          <label>
            计费公式:
            <input 
              type="text" 
              name="formula"
              value={formData.formula}
              onChange={handleInputChange}
              className="form-input"
            />
            <span className="help-icon">?</span>
          </label>
          <div className="form-hint">
            (可选，示例：数量*单价；可点击[选择公式模板])
          </div>
        </div>

        <div className="form-group">
          <label>适用项目类型:</label>
          <div className="checkbox-group">
            {['In-vivo', 'In-vitro', '药物发现'].map(type => (
              <label key={type} className="checkbox-label">
                <input 
                  type="checkbox" 
                  value={type}
                  checked={formData.projectTypes.includes(type)}
                  onChange={handleInputChange}
                />
                {type}
              </label>
            ))}
          </div>
          <div className="form-hint">
            (多选，关联AAALAC实验分类)
          </div>
        </div>

        <div className="form-group">
          <label>状态:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="status" 
                value="enabled"
                checked={formData.status === 'enabled'}
                onChange={handleInputChange}
              />
              启用
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="status" 
                value="disabled"
                checked={formData.status === 'disabled'}
                onChange={handleInputChange}
              />
              停用
            </label>
          </div>
          <div className="form-hint">
            (停用科目将无法在新建预算中选择)
          </div>
        </div>

        <div className="audit-section">
          <h3>审计追踪:</h3>
          <div className="audit-row">
            <span>创建人：自动显示当前用户</span>
            <span>创建时间：自动生成</span>
          </div>
          <div className="audit-row">
            <span>修改人：--</span>
            <span>修改时间：--</span>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => handleSubmit('取消')}
          >
            取消
          </button>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => handleSubmit('保存并新增')}
          >
            保存并新增
          </button>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => handleSubmit('提交审批')}
          >
            提交审批
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetSubjectForm;
